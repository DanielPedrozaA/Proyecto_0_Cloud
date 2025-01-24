from app.models import Categoria, db

# Crear Categoría
def crear_categoria(data):
    # Validar que los campos obligatorios estén presentes
    if 'nombre' not in data:
        return {'mensaje': 'Falta el campo obligatorio: nombre'}, 400

    # Verificar si la categoría ya existe
    if Categoria.query.filter_by(nombre=data['nombre']).first():
        return {'mensaje': 'La categoría ya existe'}, 409

    # Crear nueva categoría
    nueva_categoria = Categoria(nombre=data['nombre'],descripcion=data.get('descripcion'))
    db.session.add(nueva_categoria)
    db.session.commit()

    return {'mensaje': 'Categoría creada exitosamente'}, 201

# Eliminar Categoría
def eliminar_categoria(categoria_id):
    # Buscar la categoría por ID
    categoria = Categoria.query.get(categoria_id)
    if not categoria:
        return {'mensaje': 'Categoría no encontrada'}, 404

    # Verificar si hay tareas asociadas a esta categoría
    if categoria.clasifica:
        return {'mensaje': 'No se puede eliminar la categoría porque tiene tareas asociadas'}, 400

    # Eliminar la categoría
    db.session.delete(categoria)
    db.session.commit()

    return {'mensaje': 'Categoría eliminada exitosamente'}, 200

# Obtener Lista de Categorías
def obtener_categorias():
    categorias = Categoria.query.all()
    resultado = [{'id': categoria.id,'nombre': categoria.nombre,'descripcion': categoria.descripcion} for categoria in categorias]

    return resultado, 200

# Actualizar Categoría
def actualizar_categoria(categoria_id, data):
    # Buscar la categoría por ID
    categoria = Categoria.query.get(categoria_id)
    if not categoria:
        return {'mensaje': 'Categoría no encontrada'}, 404

    # Actualizar los campos
    if 'nombre' in data:
        if Categoria.query.filter(Categoria.nombre == data['nombre'], Categoria.id != categoria_id).first():
            return {'mensaje': 'El nombre de la categoría ya está en uso'}, 409
        categoria.nombre = data['nombre']

    if 'descripcion' in data:
        categoria.descripcion = data['descripcion']

    db.session.commit()

    return {'mensaje': 'Categoría actualizada exitosamente'}, 200
