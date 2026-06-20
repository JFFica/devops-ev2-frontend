Innovatech Frontend
Descripción

Este repositorio contiene el servicio Frontend del proyecto Innovatech Chile, desarrollado con React y Vite. El frontend fue contenedorizado con Docker y desplegado en AWS ECS Fargate como parte de la Evaluación Parcial N°3 de la asignatura Introducción a Herramientas DevOps.

La aplicación consume el backend mediante la variable de entorno VITE_API_URL y muestra en pantalla si la conexión con el backend fue exitosa.

Tecnologías utilizadas
React
Vite
JavaScript
Docker
Nginx
AWS ECR
AWS ECS Fargate
AWS CloudWatch
GitHub Actions
AWS Service Auto Scaling
Funcionalidad principal

El frontend consulta el endpoint /health del backend y muestra el estado de conexión.

Cuando la comunicación es correcta, se muestra:

Estado del Backend: OK
Frontend conectado correctamente con el backend

Esto permite validar la comunicación Frontend → Backend dentro del despliegue en AWS.

Ejecución local

Para instalar dependencias:

npm install

Para ejecutar el frontend localmente:

npm run dev

La aplicación queda disponible normalmente en:

http://localhost:5173
Variable de entorno local

Para conectar el frontend con el backend local, crear un archivo .env en la raíz del proyecto:

VITE_API_URL=http://localhost:8080

Luego reiniciar el frontend:

npm run dev
Docker

Para construir la imagen Docker del frontend en ambiente local:

docker build -t innovatech-frontend --build-arg VITE_API_URL=http://localhost:8080 .

Para ejecutar el contenedor:

docker run --rm --name innovatech-frontend-test -p 3000:80 innovatech-frontend

Luego abrir:

http://localhost:3000
Despliegue en AWS

El frontend fue desplegado en AWS utilizando los siguientes servicios:

Amazon ECR para almacenar la imagen Docker.
Amazon ECS con Fargate para ejecutar el contenedor.
Security Group con acceso HTTP al puerto 80.
CloudWatch Logs para revisar el comportamiento del servicio.
Service Auto Scaling para escalar el servicio según uso de CPU.
GitHub Actions para automatizar el despliegue.

La imagen fue subida a ECR con el nombre:

innovatech-frontend

El servicio ECS creado fue:

innovatech-frontend-service

El clúster utilizado fue:

innovatech-cluster
Configuración de red

El frontend se ejecuta mediante Nginx en el puerto:

80

Se configuró un Security Group permitiendo tráfico HTTP al puerto 80 desde internet:

HTTP | TCP | 80 | 0.0.0.0/0
Conexión con el backend

El frontend utiliza la variable:

VITE_API_URL

En AWS, esta variable apunta a la URL pública del backend:

http://IP_PUBLICA_BACKEND:8080

Importante: la URL debe ir sin /health, ya que el frontend agrega esa ruta al realizar la consulta.

Ejemplo:

VITE_API_URL=http://35.153.98.176:8080
Autoscaling

Se configuró autoscaling en ECS para el servicio frontend con los siguientes parámetros:

Mínimo de tareas: 1
Deseado: 1
Máximo de tareas: 3
Métrica: CPU
Umbral objetivo: 50%

Esta configuración permite que el servicio frontend pueda escalar automáticamente en caso de aumento de carga.

Logs y monitoreo

Los logs del frontend fueron revisados en AWS CloudWatch. Esto permitió validar que el contenedor se ejecutara correctamente y que el servicio estuviera disponible desde una URL pública.

Pipeline CI/CD

Se implementó un pipeline con GitHub Actions en la ruta:

.github/workflows/deploy.yml

El pipeline realiza el siguiente flujo:

1. Checkout del repositorio
2. Configuración de credenciales AWS
3. Login en Amazon ECR
4. Build de la imagen Docker usando VITE_API_URL
5. Tag de la imagen
6. Push de la imagen a ECR
7. Redeploy automático del servicio en ECS

El pipeline permite automatizar el despliegue del frontend cada vez que se realiza un push a la rama principal.

Secrets utilizados en GitHub Actions

Las credenciales y variables necesarias fueron configuradas mediante GitHub Secrets:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN
AWS_REGION
AWS_ACCOUNT_ID
ECS_CLUSTER
ECS_SERVICE
VITE_API_URL

No se dejaron credenciales escritas directamente en el código.

Validación funcional

La validación final se realizó accediendo a la URL pública del frontend:

http://IP_PUBLICA_FRONTEND

La aplicación muestra el estado del backend como:

Estado del Backend: OK

Esto demuestra que el frontend está desplegado en AWS ECS y que se comunica correctamente con el backend desplegado en el mismo clúster.

Problemas encontrados y solución

Durante el desarrollo se presentaron algunos problemas técnicos:

El frontend inicialmente usaba la plantilla base de Vite, por lo que se modificó para consultar el backend.
Se agregó la variable VITE_API_URL para separar la URL del backend de la lógica del código.
Se construyó la imagen Docker usando --build-arg VITE_API_URL.
Se configuró el Security Group del frontend para permitir acceso HTTP por el puerto 80.
Se configuró GitHub Actions para automatizar el build, push y redeploy hacia ECS.
Se verificó que el frontend mostrara correctamente el estado OK del backend.
Estado final

El frontend quedó desplegado correctamente en AWS ECS Fargate, con imagen en ECR, logs en CloudWatch, autoscaling configurado, pipeline CI/CD funcional mediante GitHub Actions y comunicación correcta con el backend.