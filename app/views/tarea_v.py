from datetime import datetime, timezone
from app.models import Tarea, Usuario, db, Categoria
from flask_jwt_extended import jwt_required


# Crear Tarea
@jwt_required()
def crear_tarea(data):

    if 'texto_area' not in data or 'usuario_id' not in data or 'fecha_tentativa_finalizacion' not in data:
        return {'mensaje': 'Faltan datos obligatorios'}, 400

    usuario = Usuario.query.get(data['usuario_id'])
    if not usuario:
        return {'mensaje': 'Usuario no encontrado'}, 404

    fecha_actual = datetime.now(timezone.utc)
    fecha_tentativa = datetime.fromisoformat(data['fecha_tentativa_finalizacion'])
    if fecha_tentativa < fecha_actual:
        return {'mensaje': 'La fecha tentativa no puede ser anterior a la fecha actual'}, 400

    nueva_tarea = Tarea(texto_area=data['texto_area'],fecha_creacion=fecha_actual, fecha_tentativa_finalizacion=fecha_tentativa,estado=data.get('estado', 'Sin Empezar'),usuario_id=data['usuario_id'],categoria_id=data.get('categoria_id'))
    db.session.add(nueva_tarea)
    db.session.commit()

    return {'mensaje': 'Tarea creada exitosamente'}, 201

# Get Tarea por ID
@jwt_required()
def obtener_tarea_por_id(tarea_id):

    tarea = Tarea.query.get(tarea_id)
    if not tarea:
        return {'mensaje': 'Tarea no encontrada'}, 404

    resultado = {'id': tarea.id,'texto_area': tarea.texto_area,'fecha_creacion': tarea.fecha_creacion.isoformat(),'fecha_tentativa_finalizacion': tarea.fecha_tentativa_finalizacion.isoformat(),'estado': tarea.estado,'usuario_id': tarea.usuario_id,'categoria_id': tarea.categoria_id}

    return resultado, 200


# Get Lista de Tareas por Usuario
@jwt_required()
def obtener_tareas_por_usuario(usuario_id):

    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return {'mensaje': 'Usuario no encontrado'}, 404

    tareas = Tarea.query.filter_by(usuario_id=usuario_id).all()
    resultado = [{'id': t.id,'texto_area': t.texto_area,'fecha_creacion': t.fecha_creacion.isoformat(),'fecha_tentativa_finalizacion': t.fecha_tentativa_finalizacion.isoformat(),'estado': t.estado,'categoria_id': t.categoria_id} for t in tareas]

    return resultado, 200

# Actualizar Tarea
@jwt_required()
def actualizar_tarea(tarea_id, data):
    tarea = Tarea.query.get(tarea_id)
    if not tarea:
        return {'mensaje': 'Tarea no encontrada'}, 404

    if 'texto_area' in data:
        tarea.texto_area = data['texto_area']
        
    if 'estado' in data:
        if data['estado'] not in ['Sin Empezar', 'En Proceso', 'Completado']:
            return {'mensaje': 'Estado no válido'}, 400
        tarea.estado = data['estado']

    if 'fecha_tentativa_finalizacion' in data:
        fecha_tentativa = datetime.fromisoformat(data['fecha_tentativa_finalizacion'])
        if fecha_tentativa.tzinfo is None:
            fecha_tentativa = fecha_tentativa.replace(tzinfo=timezone.utc)
        if fecha_tentativa < tarea.fecha_creacion:
            return {'mensaje': 'La fecha tentativa no puede ser anterior a la fecha de creación'}, 400

        tarea.fecha_tentativa_finalizacion = fecha_tentativa

    if 'categoria_id' in data:
        categoria_id = data['categoria_id']
        categoria = Categoria.query.get(categoria_id)
        if not categoria:
            return {'mensaje': f'Categoría con ID {categoria_id} no encontrada'}, 404
        tarea.categoria_id = categoria_id

    db.session.commit()

    return {'mensaje': 'Tarea actualizada exitosamente'}, 200

# Eliminar Tarea
@jwt_required()
def eliminar_tarea(tarea_id):

    tarea = Tarea.query.get(tarea_id)
    if not tarea:
        return {'mensaje': 'Tarea no encontrada'}, 404

    db.session.delete(tarea)
    db.session.commit()

    return {'mensaje': 'Tarea eliminada exitosamente'}, 200
