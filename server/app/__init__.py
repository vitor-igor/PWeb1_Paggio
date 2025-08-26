from flask import Flask, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
import string
import os

from .routes.admin import admin as admin_bp
from .routes.books import books as books_bp
from .routes.reviews import reviews as reviews_bp
from .routes.users import users as users_bp
from .seed_db import import_books

from .models import db, User
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.secret_key = "paggio_application_918273645"

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///paggio.db'
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    app.config['SESSION_COOKIE_SECURE'] = False

    CORS(app, supports_credentials=True)

    # USER AUTENTICATION (config)
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'login'

    # USER AUTENTICATION (bem sucedido)
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    # USER AUTENTICATION (recusado)
    @login_manager.unauthorized_handler
    def unauthorized():
        return jsonify({"error": "Unauthorized"}), 401
    
    db.init_app(app)
    migrate = Migrate(app, db)

    # Inicializando arquivo de logs
    try:
        arq = open("./logs.csv", 'r')
        arq.close()
    except FileNotFoundError:
        arq = open("./logs.csv", 'w')
        arq.write("DATE,STATUS,ID\n")
        arq.close()

    # Banco de Dados
    with app.app_context():
        # Evita o re-load desnecessário
        if os.environ.get("WERKZEUG_RUN_MAIN") == "true": 
            # Inicializando Banco de Dados
            db.create_all()

            # Alimentando Banco de Dados
            print("Alimentando banco de dados...")
            querys = ["Conceição Evaristo", "Clarice Lispector", "Carla Madeira", "Aline Bei", "Machado de Assis", "Taylor Jenkins Reid", "Stephen King", "John Green", "Harry Potter", "Percy Jackson", "Evelyn Hugo", "Crime e Castigo", "Algoritmos", "Quem é voce Alasca", "As vantagens de ser invisível"]

            for query in querys:
                import_books(query=query)

            for letra in string.ascii_lowercase:
                import_books(query=letra)

    # Conectando com as blueprints de routes
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(books_bp, url_prefix='/api/books')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    app.register_blueprint(users_bp, url_prefix='/api')

    return app