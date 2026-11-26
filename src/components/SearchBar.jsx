import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWeatherByCity } from "../features/weather/weatherSlice";
import { addSearch } from "../features/searchHistory/searchHistorySlice";

function SearchBar() {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  // Consultamos el estado de la petición en Redux.
  const status = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);

  const isLoading = status === "loading";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity || isLoading) return;

    try {
      // Buscamos la ciudad y esperamos el resultado.
      await dispatch(fetchWeatherByCity(trimmedCity)).unwrap();

      // Solo guardamos la búsqueda si ha funcionado.
      dispatch(addSearch(trimmedCity));

      // Limpiamos el campo después del éxito.
      setCity("");
    } catch {
      // El error ya está guardado en Redux.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Busca una ciudad..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
        disabled={isLoading}
        aria-label="Nombre de la ciudad"
      />

      <button type="submit" disabled={isLoading || !city.trim()}>
        {isLoading ? "Buscando..." : "Buscar"}
      </button>

      {status === "failed" && error && (
        <p className="search-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default SearchBar;
