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
            "description": book.description
        })
    return jsonify({"message": "Book details not found"}), 404

# Insere um registro de leitura (user_book)
@books.route("/status_book", methods=["POST"])
@login_required
def add_status_book():
    status_book = request.args.get("status_book")
    book_id = request.args.get("book_id")

    if status_book and book_id:
        if status_book.lower() == "lido":
            time = datetime.now()
            user_book = User_Book(status=status_book, date_start=time, date_finish=time, id_book=book_id, id_user=current_user.id)
        else:
            user_book = User_Book(status=status_book, id_book=book_id, id_user=current_user.id)

        db.session.add(user_book)
        db.session.commit()
        return jsonify({"message": "Status created succesfully"})
    return jsonify({"message": "Impossible to create status"}), 400

# Busca um conjunto de books de acordo com o status de leitura
@books.route('/status_book/<status>', methods=["GET"])
@login_required  # Adiciona a autenticação do usuário
def get_books_with_status(status):
    books = (
        Book.query
        .join(User_Book, Book.id == User_Book.id_book) # Necessário para filtrar o ID do usuário
        .filter(
            User_Book.status.ilike(f"%{status}%"),
            User_Book.id_user == current_user.id
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
