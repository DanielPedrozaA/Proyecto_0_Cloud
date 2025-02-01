# Proyecto_0_Cloud

## Que es la aplicacion?

El App es una aplicación web que permite la gestión de tareas con categorías. Los usuarios pueden crear, actualizar y eliminar tareas, así como organizarlas en categorías. La aplicación está desarrollada utilizando tecnologías modernas y se ejecuta en contenedores Docker.

## Tecnologías Utilizadas

### Backend

- Flask: Framework de desarrollo web en Python.
- Flask-JWT-Extended: Manejo de autenticación con JSON Web Tokens (JWT).
- SQLAlchemy: ORM para la base de datos PostgreSQL.
- PostgreSQL: Base de datos relacional.
- Docker: Para la contenedorización de la aplicación.

### Frontend

- React.js: Framework para el desarrollo del frontend.
- React Bootstrap: Biblioteca de componentes para el diseño.
- React Router: Manejo de rutas en la aplicación.

## Instalación y Ejecución

Tener instalado Docker y Docker Compose en tu máquina.
Clonar este repositorio: 

Para ejecutar la aplicación:
docker-compose up --build  

Esto iniciará:
- Backend en http://localhost:5000
- Frontend en http://localhost:3000
Base de datos PostgreSQL en localhost:5432

## Acceder a la aplicación:
- Abre tu navegador y visita http://localhost:3000
