import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityCoordinates, getWeatherData } from "./weatherAPI";

// Busca una ciudad y obtiene sus datos meteorológicos.
export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherByCity",
  async (city) => {
    // Primero obtenemos las coordenadas de la ciudad.
    const location = await getCityCoordinates(city);

    // Después consultamos el tiempo usando esas coordenadas.
    const weather = await getWeatherData(location.latitude, location.longitude);

    // Devolvemos los datos que necesita nuestra aplicación.
    return {
      ...location,
      current: weather.current,
      daily: weather.daily,
    };
  },
);

// Estado inicial del tiempo meteorológico.
const initialState = {
  city: "",
  country: "",
  latitude: null,
  longitude: null,
  current: null,
  daily: null,
  status: "idle",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,

  reducers: {},

  // Gestionamos los tres estados de la petición asíncrona.
  extraReducers: (builder) => {
    builder
      // La petición ha comenzado.
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // La petición ha terminado correctamente.
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.city = action.payload.name;
        state.country = action.payload.country;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;

        state.current = action.payload.current;
        state.daily = action.payload.daily;
      })

      // La petición ha fallado.
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
