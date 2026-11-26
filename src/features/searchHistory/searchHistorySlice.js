import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,

  reducers: {
    addSearch: (state, action) => {
      const city = action.payload;

      // Eliminamos la ciudad si ya existía.
      state.cities = state.cities.filter(
        (existingCity) => existingCity !== city,
      );

      // Añadimos la búsqueda al final.
      state.cities.push(city);

      // Conservamos únicamente las últimas 10 búsquedas.
      state.cities = state.cities.slice(-10);
    },
  },
});

export const { addSearch } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
