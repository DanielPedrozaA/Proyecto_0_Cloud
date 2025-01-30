from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import Usuario, db


# Crear Usuario
def crear_usuario(data):
    if 'nombre_usuario' not in data or 'contrasenia' not in data:
        return {'mensaje': 'Faltan datos obligatorios'}, 400
    
    if 'nombre_usuario' not in data or data['nombre_usuario'].strip() == "":
        return {'mensaje': 'El nombre de usuario no puede estar vacío'}, 400

    if 'contrasenia' not in data or data['contrasenia'].strip() == "":
        return {'mensaje': 'La contraseña no puede estar vacía'}, 400

    if Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first():
        return {'mensaje': 'El usuario ya existe'}, 409
    

    hashed_password = generate_password_hash(data['contrasenia'], method='pbkdf2:sha256')
    nuevo_usuario = Usuario(nombre_usuario=data['nombre_usuario'], contrasenia= hashed_password,imagen_perfil=data.get('imagen_perfil'))
    db.session.add(nuevo_usuario)
    db.session.commit()

    return {'mensaje': 'Usuario creado exitosamente'}, 201

# Iniciar Sesion
def login(data):

    if 'nombre_usuario' not in data or 'contrasenia' not in data:
        return {'mensaje': 'Faltan datos obligatorios'}, 400

    usuario = Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first()
    if not usuario or not check_password_hash(usuario.contrasenia, data['contrasenia']):
        return {'mensaje': 'Credenciales inválidas'}, 401

    access_token = create_access_token(identity=str(usuario.id))

    return {'access_token': access_token}, 200

# Obtener Usuario Actual
@jwt_required()
def obtener_usuario_actual():
    usuario_id = get_jwt_identity()
    usuario = Usuario.query.get(usuario_id)
    
    if not usuario:
        return {'mensaje': 'Usuario no encontrado'}, 404

    return {
        'id': usuario.id,
        'nombre_usuario': usuario.nombre_usuario,
        'imagen_perfil': usuario.imagen_perfil
    }, 200