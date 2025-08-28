from . import books

from flask import jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import or_, func
from datetime import datetime

from app.models import db, Book, Author, Genre, User_Book

# Busca um conjunto de books de acordo com uma query
@books.route('/<query>', methods=["GET"])
def get_books(query):
    books = (
        Book.query
        .filter(
            # O "or_" é equivalente ao "JOIN" (apresentou maior performance) para realizar querys que demandam informações além da tabela consultada
            or_(
                Book.title.ilike(f"%{query}%"),
                Book.authors.any(Author.name.ilike(f"%{query}%")),
                Book.genres.any(Genre.name.ilike(f"%{query}%"))
            )
        )
        .all()
    )
    books_list = []
    if books:
        for book in books:
            book_data = {
                "id": book.id,
                "title": book.title,
                "authors": [author.name for author in book.authors],
                "published_date": book.published_date,
                "pages": book.pages,
                "image": book.image,
                "genres": [genre.name for genre in book.genres]
            }
            books_list.append(book_data)

        return jsonify(books_list)
    
    return jsonify({"message": "Book not found"}), 404

# Busca as informações de um book específico
@books.route('/details/<id>', methods=["GET"])
def get_book_details(id):
    book = Book.query.get(id)
    if book:
        return jsonify({
            "id": book.id,
            "title": book.title,
            "authors": [author.name for author in book.authors],
            "published_date": book.published_date,
            "pages": book.pages,
            "image": book.image,
            "genres": [genre.name for genre in book.genres],
            "description": book.description,
            "isbn": book.isbn
        })
    return jsonify({"message": "Book details not found"}), 404

# Insere um registro de leitura (user_book)
@books.route("/status_book", methods=["POST"])
@login_required
def add_status_book():
    data = request.json
    status = data.get("status")
    book_id = data.get("book_id")
    rating = data.get("rating")
    last_page = data.get("last_page")
    date_start_str = data.get("date_start")
    date_finish_str = data.get("date_finish")

    if not status or not book_id:
        return jsonify({"message": "Status and book_id are required"}), 400


    existing_user_book = User_Book.query.filter_by(
        id_user=current_user.id,
        id_book=book_id
    ).first()
    
    if existing_user_book:
        return jsonify({"message": "Status for this book already exists. Use PUT to update."}), 409

    try:
        new_user_book_data = {
            "id_book": book_id,
            "id_user": current_user.id,
            "status": status,
        }

        if rating is not None:
            new_user_book_data["rating"] = rating
        if last_page is not None:
            new_user_book_data["last_page"] = last_page
            
        if date_start_str:
            new_user_book_data["date_start"] = datetime.strptime(date_start_str, "%Y-%m-%dT%H:%M:%S.%f")
        if date_finish_str:
            new_user_book_data["date_finish"] = datetime.strptime(date_finish_str, "%Y-%m-%dT%H:%M:%S.%f")

        if status.lower() in ["lendo", "lido"] and "date_start" not in new_user_book_data:
            new_user_book_data["date_start"] = datetime.now()
        if status.lower() == "lido" and "date_finish" not in new_user_book_data:
            new_user_book_data["date_finish"] = datetime.now()

        new_user_book = User_Book(**new_user_book_data)
        db.session.add(new_user_book)
        db.session.commit()
        return jsonify({"message": "Status created successfully"}), 201
    except ValueError:
        return jsonify({"message": "Invalid date format."}), 400
    
# Rota para Atualizar um Status Existente (PUT)
@books.route("/status_book", methods=["PUT"])
@login_required
def update_status_book():
    data = request.json
    status = data.get("status")
    book_id = data.get("book_id")
    rating = data.get("rating")
    last_page = data.get("last_page")
    date_start_str = data.get("date_start")
    date_finish_str = data.get("date_finish")

    if not book_id:
        return jsonify({"message": "book_id is required"}), 400

    user_book = User_Book.query.filter_by(
        id_user=current_user.id,
        id_book=book_id
    ).first()

    if not user_book:
        return jsonify({"message": "Status for this book not found. Use POST to create."}), 404

    try:
        if status is not None:
            user_book.status = status
            
        if rating is not None:
            user_book.rating = rating
        
        if last_page is not None:
            user_book.last_page = last_page
        
        if date_start_str:
            user_book.date_start = datetime.strptime(date_start_str, "%Y-%m-%d")
        
        if date_finish_str:
            user_book.date_finish = datetime.strptime(date_finish_str, "%Y-%m-%d")
            
        if status and status.lower() == "lendo" and user_book.date_start is None:
            user_book.date_start = datetime.now()
        if status and status.lower() == "lido" and user_book.date_finish is None:
            user_book.date_finish = datetime.now()

        db.session.commit()
        return jsonify({"message": "Status updated successfully"}), 200
    except ValueError:
        return jsonify({"message": "Invalid date format."}), 400

# Busca um conjunto de books de acordo com o status de leitura
@books.route('/status_book/<status>', methods=["GET"])
@login_required 
def get_books_with_status(status):
    if status.lower() == "thebest":
        books = (
            Book.query
            .join(User_Book, Book.id == User_Book.id_book) 
            .filter(
                User_Book.status.ilike(f"%{status}%"),
                User_Book.id_user == current_user.id
            )
            .order_by(User_Book.date_finish.desc())
            .all()
        )
    else:
        books = (
            Book.query
            .join(User_Book, Book.id == User_Book.id_book) 
            .filter(
                User_Book.status.ilike(f"%{status}%"),
                User_Book.id_user == current_user.id
            )
            .all()
        )

    books_list = []
    if books:
        for book in books:
            user_book = User_Book.query.filter_by(id_user=current_user.id, id_book=book.id).first()
            if user_book:
                book_data = {
                    "id": book.id,
                    "title": book.title,
                    "authors": [author.name for author in book.authors],
                    "published_date": book.published_date,
                    "pages": book.pages,
                    "image": book.image,
                    "genres": [genre.name for genre in book.genres],
                    "date_finish": user_book.date_finish.isoformat() if user_book.date_finish else None
                }
                books_list.append(book_data)

        return jsonify(books_list)
    
    return jsonify({"message": "Group of books not found"}), 404

# Busca um conjunto de books de acordo com a popularidade (definida pela quantidade de registros de leitura)
@books.route("/popular", methods=["GET"])
def get_popular_books():
    popular_books = (
        db.session.query(
            Book,
            func.count(User_Book.id).label("popularity")
        )
        .join(User_Book, Book.id == User_Book.id_book)
        .group_by(Book.id)
        .order_by(func.count(User_Book.id).desc())
        .limit(10)
    )

    result = []
    for book, popularity in popular_books:
        result.append({
            "id": book.id,
            "title": book.title,
            "authors": [author.name for author in book.authors],
            "image": book.image,
            "genres": [genre.name for genre in book.genres],
            "popularity": popularity
        })

    return jsonify(result)
