from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Inicializar extensiones
db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Inicializar extensiones
    db.init_app(app)
    jwt.init_app(app)

    # Importar y registrar los blueprints
    from app.routes.tarea_r import tarea_bp
    from app.routes.categoria_r import categoria_bp
    from app.routes.usuario_r import usuario_bp

    app.register_blueprint(tarea_bp, url_prefix='/api/tareas')
    app.register_blueprint(categoria_bp, url_prefix='/api/categorias')
    app.register_blueprint(usuario_bp, url_prefix='/auth')

    # Ruta raíz de prueba
    @app.route('/')
    def home():
        return "¡Bienvenido a la API de Proyecto 0 Cloud!"
    
    with app.app_context():
        db.create_all()

    return app
