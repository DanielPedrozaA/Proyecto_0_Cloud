from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models import Usuario, db


# Crear Usuario
def crear_usuario(data):
    if 'nombre_usuario' not in data or 'contrasenia' not in data:
        return {'mensaje': 'Faltan datos obligatorios'}, 400

    # Verificar si el usuario ya existe
    if Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first():
        return {'mensaje': 'El usuario ya existe'}, 409

    # Crear un nuevo usuario con la contraseña encriptada
    hashed_password = generate_password_hash(data['contrasenia'], method='pbkdf2:sha256')
    nuevo_usuario = Usuario(nombre_usuario=data['nombre_usuario'], contrasenia= hashed_password,imagen_perfil=data.get('imagen_perfil'))
    db.session.add(nuevo_usuario)
    db.session.commit()

    return {'mensaje': 'Usuario creado exitosamente'}, 201

# Iniciar Sesion
def login(data):
    # Validar que los campos obligatorios estén presentes
    if 'nombre_usuario' not in data or 'contrasenia' not in data:
        return {'mensaje': 'Faltan datos obligatorios'}, 400

    # Buscar al usuario en la base de datos
    usuario = Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first()
    if not usuario or not check_password_hash(usuario.contrasenia, data['contrasenia']):
        return {'mensaje': 'Credenciales inválidas'}, 401

    # Crear un token JWT
    access_token = create_access_token(identity=usuario.id)

    return {'access_token': access_token,'nombre_usuario': usuario.nombre_usuario,'imagen_perfil': usuario.imagen_perfil}, 200