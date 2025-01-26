from flask import Blueprint, request
from app.views.categoria_v import crear_categoria, eliminar_categoria, obtener_categorias

categoria_bp = Blueprint('categoria', __name__)

# Crear Categoría
@categoria_bp.route('/categorias', methods=['POST'])
def route_crear_categoria():
    return crear_categoria(request.json)

# Obtener Lista de Categorías
@categoria_bp.route('/categorias', methods=['GET'])
def route_obtener_categorias():
    return obtener_categorias()

# Eliminar Categoría
@categoria_bp.route('/categorias/<int:categoria_id>', methods=['DELETE'])
def route_eliminar_categoria(categoria_id):
    return eliminar_categoria(categoria_id)

