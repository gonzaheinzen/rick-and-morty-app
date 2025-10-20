# rick-and-morty-app
Aplicación web para ver los personajes de la serie Rick and Morty. 

Con las funcionalidades de filtrar, guardar como favorito y eliminar de favoritos, con persistencia a través de LocalStorage.

Este proyecto consume la API: https://rickandmortyapi.com/  

Está contenida en un entorno reproducible usando Docker y Nginx. 

## Cómo ejecutar

1. Clonar el repositorio:
   
   ```bash
   git clone https://github.com/gonzaheinzen/rick-and-morty-app.git
   
2. Acceder a la carpeta:
   
   ```bash
   cd rick-and-morty-app

3. Construir la imagen:
   
   ```bash
   docker build -t rick-and-morty-app .

4. Ejecutar el contenedor:
   
   ```bash
   docker run -d -p 8080:80 --name rick-and-morty rick-and-morty-app

5. Abrir el navegador en:
   
   ```bash
   http://localhost:8080

Tecnologías:
HTML, CSS, JavaScript
Docker
Nginx
SweetAlert2
Git / GitHub
