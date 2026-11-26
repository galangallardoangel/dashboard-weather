import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Acción para consultar el tiempo de una ciudad.
import { fetchWeatherByCity } from "../features/weather/weatherSlice";

function Favorites() {
  const dispatch = useDispatch();

  // Guardamos los favoritos recibidos del backend.
  const [favorites, setFavorites] = useState([]);

  // Consultamos los favoritos al cargar el componente.
  useEffect(() => {
    fetch("http://localhost:3000/api/favorites")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron obtener los favoritos");
        }
        return response.json();
      })
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Error al obtener favoritos:", error);
      });
  }, []);

  const currentCity = useSelector((state) => state.weather.city);
  const status = useSelector((state) => state.weather.status);

  const isLoading = status === "loading";
  const isFavorite = favorites.some(
    (city) => city.toLowerCase() === currentCity?.toLowerCase(),
  );

  // Añade la ciudad actual a favoritos.
  const handleAddFavorite = () => {
    if (!currentCity || isFavorite) return;

    fetch("http://localhost:3000/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: currentCity }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo añadir la ciudad");
        return response.json();
      })
      .then((data) => {
        if (data.favorites) setFavorites(data.favorites);
      })
      .catch((error) => {
        console.error("Error al añadir favorito:", error);
      });
  };

  // Elimina una ciudad de favoritos.
  const handleRemoveFavorite = (city) => {
    fetch(`http://localhost:3000/api/favorites/${encodeURIComponent(city)}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo eliminar la ciudad");
        return response.json();
      })
      .then((data) => {
        if (data.favorites) setFavorites(data.favorites);
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

      {favorites.length === 0 ? (
        <p className="empty-message">Todavía no tienes ciudades favoritas.</p>
      ) : (
        <ul className="city-list">
          {favorites.map((city) => (
            <li key={city}>
              <button
                className="city-link"
                onClick={() => handleSelectFavorite(city)}
                disabled={isLoading}
              >
                {city}
              </button>

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
