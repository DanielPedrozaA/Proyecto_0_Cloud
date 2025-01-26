from app.models import Categoria, db
from flask_jwt_extended import jwt_required

# Crear Categoría
@jwt_required()
def crear_categoria(data):
    if 'nombre' not in data:
        return {'mensaje': 'Falta el campo obligatorio: nombre'}, 400

    if Categoria.query.filter_by(nombre=data['nombre']).first():
        return {'mensaje': 'La categoría ya existe'}, 409

    nueva_categoria = Categoria(nombre=data['nombre'],descripcion=data.get('descripcion'))
    db.session.add(nueva_categoria)
    db.session.commit()

    return {'mensaje': 'Categoría creada exitosamente'}, 201

# Get Lista de Categorías
@jwt_required()
def obtener_categorias():
    categorias = Categoria.query.all()
    resultado = [{'id': categoria.id,'nombre': categoria.nombre,'descripcion': categoria.descripcion} for categoria in categorias]

    return resultado, 200

# Eliminar Categoría
@jwt_required()
def eliminar_categoria(categoria_id):

    categoria = Categoria.query.get(categoria_id)
    if not categoria:
        return {'mensaje': 'Categoría no encontrada'}, 404

    if categoria.clasifica:
        return {'mensaje': 'No se puede eliminar la categoría porque tiene tareas asociadas'}, 400

    # Eliminar la categoría
    db.session.delete(categoria)
    db.session.commit()

    return {'mensaje': 'Categoría eliminada exitosamente'}, 200