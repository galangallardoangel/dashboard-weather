# Weather Dashboard 🌤️

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md)

Un dashboard meteorológico responsive desarrollado con React, JavaScript y Node.js. Permite buscar ciudades, consultar las condiciones meteorológicas actuales, visualizar una previsión de 7 días y explorar los datos mediante gráficos interactivos.

El proyecto también incluye una API REST desarrollada con Express para gestionar ciudades favoritas.

## Funcionalidades

- Buscar ciudades y consultar sus condiciones meteorológicas actuales.
- Consultar la previsión meteorológica de los próximos 7 días.
- Visualizar datos de temperatura mediante gráficos interactivos.
- Añadir y eliminar ciudades favoritas.
- Consultar el historial de búsquedas.
- Diseño responsive para escritorio, tablet y móvil.
- API REST para gestionar ciudades favoritas.
- Comunicación entre frontend y backend mediante peticiones HTTP.

## Tecnologías

**Frontend**

- React
- JavaScript
- Vite
- Redux Toolkit
- React Redux
- Recharts
- CSS

**Backend**

- Node.js
- Express
- CORS
- API REST

**API externa**

- [Open-Meteo](https://open-meteo.com/) — Datos meteorológicos.

## Estructura del proyecto

```text
weather-dashboard/
├── src/
│   ├── components/
│   └── features/
├── public/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── package.json
└── README.md
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone YOUR_REPOSITORY_URL
cd weather-dashboard
```

### 2. Instalar las dependencias del frontend

```bash
npm install
```

### 3. Instalar las dependencias del backend

```bash
cd backend
npm install
```

## Ejecutar la aplicación

El frontend y el backend deben ejecutarse en dos terminales independientes.

**Backend**

Desde la carpeta `backend`:

```bash
node server.js
```

El backend estará disponible en:

`http://localhost:3000`

**Frontend**

Abre una segunda terminal en la raíz del proyecto:

```bash
npm run dev
```

Abre la dirección local que proporciona Vite.

## API del backend

| Método | Endpoint               | Descripción                              |
| ------ | ---------------------- | ---------------------------------------- |
| GET    | `/`                    | Mensaje de bienvenida del backend        |
| GET    | `/api/weather`         | Devuelve datos meteorológicos de ejemplo |
| GET    | `/api/favorites`       | Obtiene las ciudades favoritas           |
| POST   | `/api/favorites`       | Añade una ciudad favorita                |
| PUT    | `/api/favorites/:city` | Actualiza una ciudad favorita            |
| DELETE | `/api/favorites/:city` | Elimina una ciudad favorita              |

## Estado actual del proyecto

El frontend y el backend funcionan correctamente y se comunican mediante peticiones HTTP.

Actualmente, las ciudades favoritas se almacenan en la memoria del servidor. Al reiniciar el backend, vuelven a sus valores iniciales.

La integración de una base de datos y el almacenamiento persistente son mejoras previstas.

## Mejoras futuras

- Integrar una base de datos para almacenar los datos permanentemente.
- Ampliar las funcionalidades del backend.
- Mejorar el tratamiento de errores y las validaciones de la API.
- Publicar la aplicación online.

---

**Proyecto de portfolio desarrollado para practicar desarrollo frontend, gestión del estado e integración de backend.**
