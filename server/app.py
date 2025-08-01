from flask import Flask

from models.models import db, User, Following, Book, Author, Authors_in_Book, Genre, Genres_in_Book, Bookshelf, User_Book, Review, Reading_Progress, Liked

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///paggio.db'

db.init_app(app)

###
# ROTAS

# API HEALTH
@app.route('/api/health', methods=["GET"])
def health():
    return "OK"

###

if __name__ == "__main__":
    app.run(debug = True)