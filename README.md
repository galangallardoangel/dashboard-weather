# Weather Dashboard 🌤️

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md)

A responsive weather dashboard built with React, JavaScript and Node.js. It allows users to search for cities, check current weather conditions, explore a 7-day forecast and visualize weather data through interactive charts.

The project also includes a REST API built with Express to manage favorite cities.

## Features

- Search for cities and check current weather conditions.
- View a 7-day weather forecast.
- Visualize temperature data with interactive charts.
- Add and remove favorite cities.
- Browse search history.
- Responsive design for desktop, tablet and mobile.
- Backend REST API for managing favorite cities.
- Client-server communication using HTTP requests.

## Technologies

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
- REST API

**External API**

- [Open-Meteo](https://open-meteo.com/) — Weather data.

## Project Structure

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

## Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd weather-dashboard
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

## Running the Application

The frontend and backend must run in separate terminals.

**Backend**

From the `backend` directory:

```bash
node server.js
```

The backend will be available at:

`http://localhost:3000`

**Frontend**

Open a second terminal in the project root:

```bash
npm run dev
```

Open the local URL provided by Vite.

## Backend API

| Method | Endpoint               | Description                 |
| ------ | ---------------------- | --------------------------- |
| GET    | `/`                    | Backend welcome message     |
| GET    | `/api/weather`         | Returns sample weather data |
| GET    | `/api/favorites`       | Retrieves favorite cities   |
| POST   | `/api/favorites`       | Adds a favorite city        |
| PUT    | `/api/favorites/:city` | Updates a favorite city     |
| DELETE | `/api/favorites/:city` | Removes a favorite city     |

## Current Project Status

The frontend and backend are functional and communicate through HTTP requests.

Favorite cities are currently stored in server memory. They return to their initial values when the backend restarts.

Database integration and persistent backend storage are planned improvements.

## Future Improvements

- Integrate a database for persistent data storage.
- Expand backend functionality.
- Improve API error handling and validation.
- Deploy the application online.

---

**Portfolio project developed to practice frontend development, state management and backend integration.**
