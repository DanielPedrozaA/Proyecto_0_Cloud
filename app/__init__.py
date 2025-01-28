from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    jwt.init_app(app)

    from app.routes.tarea_r import tarea_bp
    from app.routes.categoria_r import categoria_bp
    from app.routes.usuario_r import usuario_bp

    app.register_blueprint(tarea_bp)
    app.register_blueprint(categoria_bp)
    app.register_blueprint(usuario_bp)

    @app.route('/')
    def home():
        return "¡Bienvenido a la API de Proyecto 0 Cloud!"
    
    with app.app_context():
        print("SQLALCHEMY_DATABASE_URI:", app.config['SQLALCHEMY_DATABASE_URI'])
        db.create_all()

    return app
