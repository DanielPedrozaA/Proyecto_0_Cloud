from flask import Blueprint, request
from app.views.tarea_v import (obtener_tareas_por_usuario,crear_tarea,actualizar_tarea,eliminar_tarea,obtener_tarea_por_id)

tarea_bp = Blueprint('tarea', __name__)

# Crear Tarea
@tarea_bp.route('/tareas', methods=['POST'])
def route_crear_tarea():
    return crear_tarea(request.json)

# Obtener Tarea por ID
@tarea_bp.route('/tareas/<int:tarea_id>', methods=['GET'])
def route_obtener_tarea_por_id(tarea_id):
    return obtener_tarea_por_id(tarea_id)

# Obtener Lista de Tareas por Usuario
@tarea_bp.route('/usuarios/<int:usuario_id>/tareas', methods=['GET'])
def route_obtener_tareas_por_usuario(usuario_id):
    return obtener_tareas_por_usuario(usuario_id)

# Actualizar Tarea
@tarea_bp.route('/tareas/<int:tarea_id>', methods=['PUT'])
def route_actualizar_tarea(tarea_id):
    return actualizar_tarea(tarea_id, request.json)

# Eliminar Tarea
@tarea_bp.route('/tareas/<int:tarea_id>', methods=['DELETE'])
def route_eliminar_tarea(tarea_id):
    return eliminar_tarea(tarea_id)


