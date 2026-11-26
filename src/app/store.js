import { configureStore } from "@reduxjs/toolkit";

// Importamos los reducers de cada sección de Redux.
import weatherReducer from "../features/weather/weatherSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import searchHistoryReducer from "../features/searchHistory/searchHistorySlice";

// Recuperamos los datos guardados en el navegador.
const loadState = () => {
  try {
    const savedState = localStorage.getItem("weather-dashboard");

    // Si no hay datos guardados, utilizamos el estado inicial.
    if (!savedState) return undefined;

    const parsedState = JSON.parse(savedState);

    // Comprobamos que los datos recuperados tengan el formato esperado.
    return {
      favorites: {
        cities: Array.isArray(parsedState.favorites?.cities)
          ? parsedState.favorites.cities
          : [],
      },
      searchHistory: {
        cities: Array.isArray(parsedState.searchHistory?.cities)
          ? parsedState.searchHistory.cities
          : [],
      },
    };
  } catch (error) {
    // Si los datos están dañados, mostramos el error y empezamos de cero.
    console.error("Error al recuperar los datos:", error);
    return undefined;
  }
};

// Creamos el store central de Redux.
const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    searchHistory: searchHistoryReducer,
  },

  // Cargamos los datos guardados anteriormente.
  preloadedState: loadState(),
});

// Guardamos favoritos e historial cada vez que Redux cambia.
store.subscribe(() => {
  const { favorites, searchHistory } = store.getState();

  try {
    localStorage.setItem(
      "weather-dashboard",
      JSON.stringify({
        favorites,
        searchHistory,
      }),
    );
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
});

export default store;
