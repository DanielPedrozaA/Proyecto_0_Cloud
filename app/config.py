import os

class Config:
    SQLALCHEMY_DATABASE_URI =  'postgresql://task_user:password@db/task_manager'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt_clave_secreta')
