from flask import Blueprint, request
from app.views.usuario_v import crear_usuario, login

usuario_bp = Blueprint('usuario', __name__)

# Crear Usuario
@usuario_bp.route('/usuarios', methods=['POST'])
def route_crear_usuario():
    return crear_usuario(request.json)

# Iniciar Sesión
@usuario_bp.route('/usuarios/iniciar-sesion', methods=['POST'])
def route_login():
    return login(request.json)
