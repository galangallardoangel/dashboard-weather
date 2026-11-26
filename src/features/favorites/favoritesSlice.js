import { createSlice } from "@reduxjs/toolkit";

// Estado inicial: todavía no hay ciudades favoritas.
const initialState = {
  cities: [],
};

const favoritesSlice = createSlice({
  // Nombre que identifica este slice dentro de Redux.
  name: "favorites",

  // Estado inicial del slice.
  initialState,

  // Reducers: funciones que definen cómo cambia el estado.
  reducers: {
    // Añade una ciudad a favoritos si todavía no existe.
    addFavourites: (state, action) => {
      // action.payload contiene la ciudad que queremos añadir.
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },

    // Elimina de favoritos la ciudad recibida.
    removeFavourite: (state, action) => {
      // filter crea un nuevo array excluyendo la ciudad indicada.
      state.cities = state.cities.filter((city) => city !== action.payload);
    },
  },
});

// Exportamos los action creators para utilizarlos desde React.
export const { addFavourites, removeFavourite } = favoritesSlice.actions;

// Exportamos el reducer para registrarlo en el Store.
export default favoritesSlice.reducer;
