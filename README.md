# Innovatech Frontend - EP2 DevOps

Frontend desarrollado en React + Vite para la Evaluación Parcial N°2 de Introducción a Herramientas DevOps.

## Descripción

Este frontend permite visualizar y gestionar información de Innovatech Chile, consumiendo endpoints del backend para:

- Visualizar proyectos.
- Crear proyectos.
- Eliminar proyectos.
- Visualizar recursos humanos.
- Crear recursos humanos.
- Eliminar recursos humanos.
- Consultar indicadores generales desde analítica.

## Tecnologías utilizadas

- React
- Vite
- Axios
- Docker
- Docker Compose
- Nginx
- GitHub Actions
- AWS EC2

## Estructura principal

innovatech-frontend/
├── src/
├── Dockerfile
├── docker-compose.yml
├── README.md
└── .github/workflows/deploy.yml

## Ejecución local
npm install
npm run dev

## URL local
http://localhost:5173


## Ejecución con Docker Compose
docker compose up --build