# Usa la imagen base de Python
FROM python:3.12-slim

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia las dependencias e instálalas
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente
COPY . .

# Exponer el puerto 5000 para Flask
EXPOSE 5000

# Comando para correr la aplicación
CMD ["flask", "run", "--host=0.0.0.0"]
