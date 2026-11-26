export const getWeatherInfo = (code, isDay = true) => {
  const weatherConditions = {
    0: {
      icon: isDay ? "☀️" : "🌙",
      description: "Despejado",
    },
    1: {
      icon: isDay ? "🌤️" : "🌙",
      description: "Mayormente despejado",
    },
    2: {
      icon: "⛅",
      description: "Parcialmente nublado",
    },
    3: {
      icon: "☁️",
      description: "Nublado",
    },
    45: {
      icon: "🌫️",
      description: "Niebla",
    },
    48: {
      icon: "🌫️",
      description: "Niebla con escarcha",
    },
    51: {
      icon: "🌦️",
      description: "Llovizna ligera",
    },
    53: {
      icon: "🌦️",
      description: "Llovizna moderada",
    },
    55: {
      icon: "🌧️",
      description: "Llovizna intensa",
    },
    56: {
      icon: "🌧️",
      description: "Llovizna helada",
    },
    57: {
      icon: "🌧️",
      description: "Llovizna helada intensa",
    },
    61: {
      icon: "🌧️",
      description: "Lluvia ligera",
    },
    63: {
      icon: "🌧️",
      description: "Lluvia moderada",
    },
    65: {
      icon: "🌧️",
      description: "Lluvia intensa",
    },
    66: {
      icon: "🌧️",
      description: "Lluvia helada",
    },
    67: {
      icon: "🌧️",
      description: "Lluvia helada intensa",
    },
    71: {
      icon: "🌨️",
      description: "Nevada ligera",
    },
    73: {
      icon: "🌨️",
      description: "Nevada moderada",
    },
    75: {
      icon: "❄️",
      description: "Nevada intensa",
    },
    77: {
      icon: "❄️",
      description: "Granos de nieve",
    },
    80: {
      icon: "🌦️",
      description: "Chubascos ligeros",
    },
    81: {
      icon: "🌧️",
      description: "Chubascos moderados",
    },
    82: {
      icon: "⛈️",
      description: "Chubascos intensos",
    },
    85: {
      icon: "🌨️",
      description: "Chubascos de nieve",
    },
    86: {
      icon: "❄️",
      description: "Chubascos de nieve intensos",
    },
    95: {
      icon: "⛈️",
      description: "Tormenta",
    },
    96: {
      icon: "⛈️",
      description: "Tormenta con granizo",
    },
    99: {
      icon: "⛈️",
      description: "Tormenta intensa con granizo",
    },
  };

  return (
    weatherConditions[code] ?? {
      icon: "🌡️",
      description: "Condiciones desconocidas",
    }
  );
};
