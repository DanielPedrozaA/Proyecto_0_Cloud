from app import db
from datetime import datetime, timezone
from sqlalchemy import Enum

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(100), unique=True, nullable=False)
    contrasenia = db.Column(db.String(255), nullable=False)
    imagen_perfil = db.Column(db.String(255), nullable=True)
    posee = db.relationship('Tarea', backref='usuario', lazy=True)

class Categoria(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), unique=True, nullable=False)
    descripcion = db.Column(db.String(255), nullable=True)
    clasifica = db.relationship('Tarea', backref='categoria', lazy=True)

class Tarea(db.Model):
    __tablename__ = 'tareas'
    id = db.Column(db.Integer, primary_key=True)
    texto_area = db.Column(db.String(255), nullable=False)
    fecha_creacion = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now())
    fecha_tentativa_finalizacion = db.Column(db.DateTime(timezone=True), nullable=False)
    estado = db.Column(Enum('Sin Empezar', 'En Proceso', 'Completado', name='estado_tarea'),nullable=False,default='Sin Empezar')
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=True)

