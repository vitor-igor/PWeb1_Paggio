from . import reviews

from flask import jsonify, request
from flask_login import login_required, current_user

from app.models import db, Book, User, Review, User_Book

# Busca as reviews mais recentes
@reviews.route('/', methods=['GET'])
def get_reviews():
    reviews = (
            Review.query
            .order_by(Review.date.desc())
            .limit(10)
        )

    reviews_list = []
    for review in reviews:
        user = User.query.get(review.user_book.id_user)
        reviews_list.append({
            "id": review.id,
            "text": review.text,
            "date": review.date.strftime("%d/%m/%Y"),
            "user": {
                "id": user.id,
                "name": user.name,
                "image": user.image
            }
        })

    return jsonify(reviews_list)

# Busca as reviews de um book específico
@reviews.route('/<book_id>', methods=['GET'])
def get_book_reviews(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found"}), 404

    user_books = User_Book.query.filter_by(id_book=book_id).all()
    user_book_ids = [register.id for register in user_books]

    reviews = Review.query.filter(Review.id_user_book.in_(user_book_ids)).order_by(Review.date.desc()).all()

    reviews_list = []
    for review in reviews:
        user = User.query.get(review.user_book.id_user)
        reviews_list.append({
            "id": review.id,
            "text": review.text,
            "date": review.date.strftime("%d/%m/%Y"),
            "user": {
                "id": user.id,
                "name": user.name,
                "image": user.image
            }
        })

    return jsonify(reviews_list)

# Insere uma nova review de um book específico
@reviews.route('/<book_id>/add', methods=['POST'])
@login_required
def add_review(book_id):
    data = request.get_json(silent=True) or request.form
    
    if "text" not in data:
        return jsonify({"message": "Review text is required"}), 400

    user_book = User_Book.query.filter_by(id_book=book_id, id_user=current_user.id).first()

    # Verifica se o user_book já foi registrado
    if not user_book:
        return jsonify({"message": "A register of status of reading is required."}), 403

    review = Review(
        text=data['text'],
        id_user_book=user_book.id
    )
    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Review added successfully"})