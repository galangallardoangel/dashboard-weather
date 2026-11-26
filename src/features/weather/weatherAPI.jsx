// Busca una ciudad y obtiene sus coordenadas mediante la API de Geocoding.
export const getCityCoordinates = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al buscar la ciudad");
  }

  const data = await response.json();

  // Si no hay resultados, la ciudad no existe o no se ha encontrado.
  if (!data.results || data.results.length === 0) {
    throw new Error("No se ha encontrado la ciudad");
  }

  const { latitude, longitude, name, country } = data.results[0];

  return { latitude, longitude, name, country };
};

// Obtiene el tiempo actual y la previsión de 7 días.
export const getWeatherData = async (latitude, longitude) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener los datos meteorológicos");
  }

  return await response.json();
};
