import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Acción para consultar el tiempo de una ciudad.
import { fetchWeatherByCity } from "../features/weather/weatherSlice";

function Favorites() {
  const dispatch = useDispatch();
  // Guardamos las ciudades favoritas recibidas del backend.
  const [favorites, setFavorites] = useState([]);

  // Consultamos los favoritos al cargar el componente.
  useEffect(() => {
    fetch("http://localhost:3000/api/favorites")
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Error al obtener favoritos:", error);
      });
  }, []);

  // Recuperamos la ciudad que estamos consultando actualmente.
  const currentCity = useSelector((state) => state.weather.city);

  // Consultamos el estado de las peticiones meteorológicas.
  const status = useSelector((state) => state.weather.status);

  // Comprobamos si hay una petición en curso.
  const isLoading = status === "loading";

  // Comprobamos si la ciudad actual ya está en favoritos.
  const isFavorite = favorites.includes(currentCity);

  // Añade la ciudad actual a la lista de favoritos.
  const handleAddFavorite = () => {
    if (currentCity && !isFavorite) {
      fetch("http://localhost:3000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: currentCity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.favorites) {
            setFavorites(data.favorites);
          }
        })
        .catch((error) => {
          console.error("Error al añadir favorito:", error);
        });
    }
  };

  // Elimina una ciudad concreta de favoritos.
  const handleRemoveFavorite = (city) => {
    fetch(`http://localhost:3000/api/favorites/${encodeURIComponent(city)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.favorites) {
          setFavorites(data.favorites);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar favorito:", error);
      });
  };

  // Consulta el tiempo de una ciudad seleccionada.
  const handleSelectFavorite = (city) => {
    if (!isLoading) {
      dispatch(fetchWeatherByCity(city));
    }
  };

  return (
    <section className="side-card">
      {/* Título y botón para añadir la ciudad actual */}
      <div className="section-heading">
        <h2>Ciudades favoritas</h2>

        <button
          className="small-button"
          onClick={handleAddFavorite}
          disabled={!currentCity || isFavorite || isLoading}
        >
          {isFavorite ? "Añadida" : "+ Añadir"}
        </button>
      </div>

      {/* Mostramos un mensaje si todavía no hay favoritos */}
      {favorites.length === 0 ? (
        <p className="empty-message">Todavía no tienes ciudades favoritas.</p>
      ) : (
        /* Mostramos la lista de ciudades favoritas */
        <ul className="city-list">
          {favorites.map((city) => (
            <li key={city}>
              {/* Al pulsar la ciudad consultamos su meteorología */}
              <button
                className="city-link"
                onClick={() => handleSelectFavorite(city)}
                disabled={isLoading}
              >
                {city}
              </button>

              {/* Botón para eliminar la ciudad de favoritos */}
              <button
                className="remove-button"
                onClick={() => handleRemoveFavorite(city)}
                aria-label={`Eliminar ${city} de favoritos`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Favorites;
