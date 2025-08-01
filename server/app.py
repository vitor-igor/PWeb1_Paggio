from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_login import login_user, LoginManager, login_required, logout_user, current_user

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
# ROTAS

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

###

if __name__ == "__main__":
    app.run(debug = True)