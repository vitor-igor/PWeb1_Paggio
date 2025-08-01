from app import app
from models.models import db
import models.models

with app.app_context():
    db.drop_all() 
    db.create_all()
    print("Banco de dados criado com sucesso!")