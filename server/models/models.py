from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

import uuid
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(45), nullable=False)
    image = db.Column(db.Text)
    count_followers = db.Column(db.Integer, default=0)
    count_following = db.Column(db.Integer, default=0)

    books = db.relationship("User_Book", backref="user", lazy=True)
    followers = db.relationship("Following", foreign_keys='Following.id_followed', backref="followed", lazy=True)
    following = db.relationship("Following", foreign_keys='Following.id_follower', backref="follower", lazy=True)
    likes = db.relationship("Liked", backref="user", lazy=True)

class Following(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    date = db.Column(db.DateTime, default=datetime.now())

    id_follower = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    id_followed = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)

class Book(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(120), nullable=False)
    published_date = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=False)
    isbn = db.Column(db.String(13), nullable=False)
    pages = db.Column(db.Integer, nullable=False)
    language = db.Column(db.String(2), nullable=False)
    image = db.Column(db.Text)

    authors = db.relationship("Author", secondary="authors_book", backref="books")
    genres = db.relationship("Genre", secondary="genres_book", backref="books")
    user_books = db.relationship("User_Book", backref="book", lazy=True)

class Author(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(80), nullable=False, unique=True)

class Authors_in_Book(db.Model):
    __tablename__ = "authors_book"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    id_book = db.Column(db.String(36), db.ForeignKey('book.id'), nullable=False)
    id_author = db.Column(db.String(36), db.ForeignKey('author.id'), nullable=False)

class Genre(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(45), nullable=False, unique=True)

class Genres_in_Book(db.Model):
    __tablename__ = "genres_book"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    id_book = db.Column(db.String(36), db.ForeignKey('book.id'), nullable=False)
    id_genre = db.Column(db.String(36), db.ForeignKey('genre.id'), nullable=False)

class Bookshelf(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(45), nullable=False, unique=True)

    user_books = db.relationship("User_Book", backref="bookshelf", lazy=True)

class User_Book(db.Model):
    __tablename__ = "user_book"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    status = db.Column(db.String(45), nullable=False)
    date_start = db.Column(db.DateTime, default=datetime.now())
    date_finish = db.Column(db.DateTime)
    last_page = db.Column(db.Integer)
    rating = db.Column(db.Integer)

    id_book = db.Column(db.String(36), db.ForeignKey('book.id'), nullable=False)
    id_user = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    id_bookshelf = db.Column(db.String(36), db.ForeignKey('bookshelf.id'))

    reviews = db.relationship("Review", backref="user_book", lazy=True)
    progress = db.relationship("Reading_Progress", backref="user_book", lazy=True)

class Review(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    text = db.Column(db.Text, nullable=False)
    id_user_book = db.Column(db.String(36), db.ForeignKey('user_book.id'), nullable=False)

    likes = db.relationship("Liked", backref="review", lazy=True)

class Reading_Progress(db.Model):
    __tablename__ = "reading_progress"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    page = db.Column(db.Integer, nullable=False)
    note = db.Column(db.Text)

    id_user_book = db.Column(db.String(36), db.ForeignKey('user_book.id'), nullable=False)

    likes = db.relationship("Liked", backref="note", lazy=True)

class Liked(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    id_user = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    id_review = db.Column(db.String(36), db.ForeignKey('review.id'))
    id_note = db.Column(db.String(36), db.ForeignKey('reading_progress.id'))
