// Hooks de Redux para acceder al estado global.
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Componentes de la aplicación.
import SearchBar from "./components/SearchBar";
import Forecast from "./components/Forecast";
import WeatherChart from "./components/WeatherChart";
import Favorites from "./components/Favorites";
import SearchHistory from "./components/SearchHistory";

// Función auxiliar para traducir códigos meteorológicos
// a iconos y descripciones.
import { getWeatherInfo } from "./features/weather/weatherUtils";

// Estilos de la aplicación.
import "./App.css";

function App() {
  // Obtenemos los datos meteorológicos del estado global.
  const { city, country, current, status, error } = useSelector(
    (state) => state.weather,
  );
  // Guardamos los favoritos recibidos del backend.
  useEffect(() => {
    // Realizamos una petición al backend para obtener los favoritos.
    fetch("http://localhost:3000/api/favorites")
      .then((response) => response.json())
      .then((data) => {
        console.log("Favoritos recibidos del backend:", data);
      })
      .catch((error) => {
        console.error("Error al conectar con el backend:", error);
      });
  }, []);

  // Obtenemos el icono y la descripción de las condiciones actuales.
  // Comprobamos que current exista antes de acceder a sus propiedades.
  const weatherInfo = current
    ? getWeatherInfo(current.weather_code, current.is_day === 1)
    : null;

  return (
    // Contenedor principal de toda la aplicación.
    <main className="dashboard">
      {/* Cabecera del dashboard */}
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Tablero El Tiempo / Angel galán</span>
          <h1>El tiempo</h1>
          <p>Consulta el tiempo y la previsión de cualquier ciudad.</p>
        </div>
      </header>

      {/* Buscador de ciudades */}
      <SearchBar />

      {/* Secciones de favoritos e historial */}
      <div className="sidebar-sections">
        <Favorites />
        <SearchHistory />
      </div>

      {/* Mensaje mientras se realiza la petición a la API */}
      {status === "loading" && (
        <div className="message-card">
          <p>Consultando el tiempo...</p>
        </div>
      )}

      {/* Mostramos el error si la petición ha fallado */}
      {status === "failed" && (
        <div className="message-card error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Mostramos los datos cuando la petición termina correctamente */}
      {status === "succeeded" && current && (
        <>
          {/* Tarjeta principal con el tiempo actual */}
          <section className="current-weather">
            {/* Nombre y país de la ciudad seleccionada */}
            <div className="current-location">
              <span>TIEMPO ACTUAL</span>
              <h2>
                {city}, {country}
              </h2>
            </div>

            {/* Icono y descripción de las condiciones meteorológicas */}
            <div className="current-condition">
              <span className="weather-icon">{weatherInfo.icon}</span>
              <p>{weatherInfo.description}</p>
            </div>

            {/* Temperatura actual */}
            <div className="main-temperature">
              <span>{Math.round(current.temperature_2m)}°</span>
              <p>Temperatura actual</p>
            </div>

            {/* Información meteorológica adicional */}
            <div className="weather-details">
              {/* Humedad relativa */}
              <div className="weather-detail">
                <span>Humedad</span>
                <strong>{current.relative_humidity_2m}%</strong>
              </div>

              {/* Sensación térmica */}
              <div className="weather-detail">
                <span>Sensación térmica</span>
                <strong>{Math.round(current.apparent_temperature)}°C</strong>
              </div>

              {/* Velocidad del viento */}
              <div className="weather-detail">
                <span>Viento</span>
                <strong>{current.wind_speed_10m} km/h</strong>
              </div>
            </div>
          </section>

          {/* Previsión meteorológica de los próximos siete días */}
          <Forecast />

          {/* Gráfico de evolución de temperaturas */}
          <WeatherChart />
        </>
      )}

      {/* Pantalla inicial cuando todavía no se ha realizado ninguna búsqueda */}
      {status === "idle" && (
        <div className="welcome-card">
          <h2>¿Qué tiempo hace hoy?</h2>
          <p>Busca una ciudad para consultar sus condiciones meteorológicas.</p>
        </div>
      )}
    </main>
  );
}

export default App;
