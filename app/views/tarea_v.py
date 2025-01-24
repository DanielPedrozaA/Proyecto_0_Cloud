from datetime import datetime, timezone
from app.models import Tarea, Usuario, db


# Obtener Lista de Tareas por Usuario
def obtener_tareas_por_usuario(usuario_id):
    # Verificar que el usuario exista
    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return {'mensaje': 'Usuario no encontrado'}, 404

    # Obtener las tareas del usuario
    tareas = Tarea.query.filter_by(usuario_id=usuario_id).all()
    resultado = [{'id': t.id,'texto_area': t.texto_area,'fecha_creacion': t.fecha_creacion.isoformat(),'fecha_tentativa_finalizacion': t.fecha_tentativa_finalizacion.isoformat(),'estado': t.estado,'categoria_id': t.categoria_id} for t in tareas]

    return resultado, 200


# Crear Tarea
def crear_tarea(data):
    # Validar los datos obligatorios
    if 'texto_area' not in data or 'usuario_id' not in data or 'fecha_tentativa_finalizacion' not in data:
        return {'mensaje': 'Faltan datos obligatorios'}, 400

    # Validar que el usuario exista
    usuario = Usuario.query.get(data['usuario_id'])
    if not usuario:
        return {'mensaje': 'Usuario no encontrado'}, 404

    # Validar que la fecha tentativa no sea anterior a la fecha actual
    fecha_actual = datetime.now(timezone.utc)
    fecha_tentativa = datetime.fromisoformat(data['fecha_tentativa_finalizacion'])
    if fecha_tentativa < fecha_actual:
        return {'mensaje': 'La fecha tentativa no puede ser anterior a la fecha actual'}, 400

    # Crear nueva tarea
    nueva_tarea = Tarea(texto_area=data['texto_area'],fecha_creacion=fecha_actual, fecha_tentativa_finalizacion=fecha_tentativa,estado=data.get('estado', 'sin empezar'),usuario_id=data['usuario_id'],categoria_id=data.get('categoria_id'))
    db.session.add(nueva_tarea)
    db.session.commit()

    return {'mensaje': 'Tarea creada exitosamente'}, 201


# Actualizar Tarea
def actualizar_tarea(tarea_id, data):
    # Buscar la tarea por ID
    tarea = Tarea.query.get(tarea_id)
    if not tarea:
        return {'mensaje': 'Tarea no encontrada'}, 404

    # Actualizar los campos permitidos
    if 'texto_area' in data:
        tarea.texto_area = data['texto_area']
    if 'estado' in data:
        if data['estado'] not in ['sin empezar', 'en proceso', 'completado']:
            return {'mensaje': 'Estado no válido'}, 400
        tarea.estado = data['estado']
    if 'fecha_tentativa_finalizacion' in data:
        fecha_tentativa = datetime.fromisoformat(data['fecha_tentativa_finalizacion'])
        fecha_actual = datetime.now(timezone.utc)
        if fecha_tentativa < fecha_actual:
            return {'mensaje': 'La fecha tentativa no puede ser anterior a la fecha actual'}, 400
        tarea.fecha_tentativa_finalizacion = fecha_tentativa

    db.session.commit()

    return {'mensaje': 'Tarea actualizada exitosamente'}, 200


# Eliminar Tarea
def eliminar_tarea(tarea_id):
    # Buscar la tarea por ID
    tarea = Tarea.query.get(tarea_id)
    if not tarea:
        return {'mensaje': 'Tarea no encontrada'}, 404

    # Eliminar la tarea
    db.session.delete(tarea)
    db.session.commit()

    return {'mensaje': 'Tarea eliminada exitosamente'}, 200


# Obtener Tarea por ID
def obtener_tarea_por_id(tarea_id):
    # Buscar la tarea por ID
    tarea = Tarea.query.get(tarea_id)
    if not tarea:
        return {'mensaje': 'Tarea no encontrada'}, 404

    # Devolver los detalles de la tarea
    resultado = {'id': tarea.id,'texto_area': tarea.texto_area,'fecha_creacion': tarea.fecha_creacion.isoformat(),'fecha_tentativa_finalizacion': tarea.fecha_tentativa_finalizacion.isoformat(),'estado': tarea.estado,'usuario_id': tarea.usuario_id,'categoria_id': tarea.categoria_id}

    return resultado, 200
