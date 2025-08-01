from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_login import login_user, LoginManager, login_required, logout_user, current_user
from sqlalchemy import or_, func
from datetime import datetime

from models.models import db, User, Following, Book, Author, Authors_in_Book, Genre, Genres_in_Book, Bookshelf, User_Book, Review, Reading_Progress, Liked

app = Flask(__name__)
app.config['SECRET_KEY'] = "paggio_application_918273645"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///paggio.db'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False

CORS(app, supports_credentials=True)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

db.init_app(app)

###
# ROUTES

# API HEALTH
@app.route('/api/health', methods=["GET"])
def health():
    return "OK"

# USER AUTENTICATION
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({"error": "Unauthorized"}), 401

# USERS ROUTES
@app.route('/api/users/<user_id>', methods=["GET"])
def get_user_details(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "image": user.image
        })
    return jsonify({"message": "User not found"}), 404

@app.route('/api/user/perfil', methods=["GET"])
@login_required
def get_perfil():
    user = User.query.get(current_user.id)
    if user:
        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "image": user.image
        })
    return jsonify({"message": "User not found"}), 404

@app.route("/api/add/user", methods=["POST"])
def add_user():
    data = request.get_json(silent=True) or request.form

    if 'name' in data and 'email' in data and 'password' in data:
        user = User(name=data['name'], email=data['email'], password=data['password'], image=data.get('image', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4kuGLd4q6jupPT2IzqQAhQa4PCAWmpPEbQ&s"))
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User added succesfully"})
    return jsonify({"message": "Invalid user data"}), 400

@app.route('/api/login', methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(name=data.get("name")).first()

    if user and data.get("password") == user.password:
        login_user(user)
        return jsonify({"message": "Logged in successfully"})
        
    return jsonify({"message": "Unauthorized. Invalid credentials"}), 401

@app.route('/api/logout', methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successfully"})

# BOOKS ROUTES
@app.route('/api/books/<query>', methods=["GET"])
def get_books(query):
    books = (
        Book.query
        # .join(Authors_in_Book)
        # .join(Author)
        # .join(Genres_in_Book, Genres_in_Book.id_book == Book.id)
        # .join(Genre, Genre.id == Genres_in_Book.id_genre)
        .filter(
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

@app.route('/api/books/details/<id>', methods=["GET"])
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

@app.route("/api/books/popular", methods=["GET"])
def get_popular_books():
    popular_books = (
        db.session.query(
            Book,
            func.count(User_Book.id).label("popularity")
        )
        .join(User_Book, Book.id == User_Book.id_book)
        .group_by(Book.id)
        .order_by(func.count(User_Book.id).desc())
        .limit(8)
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

@app.route("/api/books/status_book", methods=["POST"])
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

###

if __name__ == "__main__":
    app.run(debug = True)