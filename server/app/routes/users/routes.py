from . import users

from flask import jsonify, request
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

from app.models import db, User

# Cadastro de user
@users.route("/add/user", methods=["POST"])
def add_user():
    data = request.get_json(silent=True) or request.form

    if 'name' in data and 'email' in data and 'password' in data:
        hashed = generate_password_hash(data['password'], method="pbkdf2:sha256", salt_length=16)
        user = User(
            name=data['name'], 
            email=data['email'], 
            password=hashed, 
            image=data.get('image', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4kuGLd4q6jupPT2IzqQAhQa4PCAWmpPEbQ&s")
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User added succesfully"})
    return jsonify({"message": "Invalid user data"}), 400

# User Login
@users.route('/login', methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(name=data.get("name")).first()

    if user and check_password_hash(user.password, data.get("password", "")):
        login_user(user)

        # Atualizando arquivo de logs
        with open("./logs.csv", 'a', encoding='utf-8') as arq:
            log = f"{datetime.now()},Login,{user.id}\n"
            arq.write(log)
        
        return jsonify({"message": "Logged in successfully"})
        
    return jsonify({"message": "Unauthorized. Invalid credentials"}), 401

# User Logout
@users.route('/logout', methods=["POST"])
@login_required
def logout():
    user_id = current_user.id

    logout_user()

    # Atualizando arquivo de logs
    with open("./logs.csv", 'a', encoding='utf-8') as arq:
        log = f"{datetime.now()},Logout,{user_id}\n"
        arq.write(log)

    return jsonify({"message": "Logout successfully"})

# Visualização do próprio perfil de user
@users.route('/user/perfil', methods=["GET"])
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

# Visualização do perfil de outros users
@users.route('/users/<user_id>', methods=["GET"])
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
