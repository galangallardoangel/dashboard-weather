import { useDispatch, useSelector } from "react-redux";

// Acción para consultar el tiempo de una ciudad.
import { fetchWeatherByCity } from "../features/weather/weatherSlice";

function SearchHistory() {
  // Permite enviar acciones a Redux.
  const dispatch = useDispatch();

  // Recuperamos el historial de búsquedas.
  const history = useSelector((state) => state.searchHistory.cities);

  // Recuperamos el estado de las peticiones.
  const status = useSelector((state) => state.weather.status);

  // Comprobamos si hay una petición en curso.
  const isLoading = status === "loading";

  // Permite volver a consultar una ciudad del historial.
  const handleSelectCity = (city) => {
    if (!isLoading) {
      dispatch(fetchWeatherByCity(city));
    }
  };

  return (
    <section className="side-card">
      {/* Título de la sección */}
      <h2>Historial de búsquedas</h2>

      {/* Si no hay búsquedas, mostramos un mensaje */}
      {history.length === 0 ? (
        <p className="empty-message">Todavía no has buscado ninguna ciudad.</p>
      ) : (
        /* Mostramos las ciudades empezando por la más reciente */
        <ul className="city-list">
          {[...history].reverse().map((city) => (
            <li key={city}>
              {/* Al pulsar una ciudad volvemos a consultar su tiempo */}
              <button
                className="city-link"
                onClick={() => handleSelectCity(city)}
                disabled={isLoading}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SearchHistory;
