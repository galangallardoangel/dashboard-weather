const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Lista temporal de ciudades favoritas.
let favorites = ["Madrid", "Córdoba"];

// Ruta principal.
app.get("/", (req, res) => {
  res.send("¡Nuestro backend funciona!");
});

// Primera ruta que devuelve datos JSON.
app.get("/api/weather", (req, res) => {
  res.json({
    city: "Madrid",
    temperature: 18,
    humidity: 65,
    country: "España",
  });
});

// Obtener la lista de ciudades favoritas.
app.get("/api/favorites", (req, res) => {
  res.json(favorites);
});

// Añadir una ciudad a favoritos.
app.post("/api/favorites", (req, res) => {
  const newCity = req.body.city;

  // Comprobar que se ha enviado una ciudad válida.
  if (!newCity || typeof newCity !== "string" || !newCity.trim()) {
    return res.status(400).json({
      error: "Debes enviar un nombre de ciudad válido",
    });
  }

  // Añadir la ciudad a favoritos.
  favorites.push(newCity.trim());

  // Devolver la lista actualizada.
  res.json({
    message: "Ciudad añadida a favoritos",
    favorites: favorites,
  });
});

// Eliminar una ciudad de favoritos.
app.delete("/api/favorites/:city", (req, res) => {
  const cityToDelete = req.params.city;

  const cityExists = favorites.some(
    (city) => city.toLowerCase() === cityToDelete.toLowerCase(),
  );

  if (!cityExists) {
    return res.status(404).json({
      error: "La ciudad no existe en favoritos",
    });
  }

  favorites = favorites.filter(
    (city) => city.toLowerCase() !== cityToDelete.toLowerCase(),
  );

  res.json({
    message: "Ciudad eliminada correctamente",
    favorites: favorites,
  });
});

// Actualizar una ciudad de favoritos.
app.put("/api/favorites/:city", (req, res) => {
  const cityToUpdate = req.params.city;
  const newCity = req.body.city;

  const cityIndex = favorites.findIndex(
    (city) => city.toLowerCase() === cityToUpdate.toLowerCase(),
  );

  if (cityIndex === -1) {
    return res.status(404).json({
      error: "La ciudad que quieres actualizar no existe",
    });
  }

  if (!newCity || typeof newCity !== "string" || !newCity.trim()) {
    return res.status(400).json({
      error: "Debes enviar un nombre de ciudad válido",
    });
  }

  favorites[cityIndex] = newCity.trim();

  res.json({
    message: "Ciudad actualizada correctamente",
    favorites: favorites,
  });
});

// Ponemos el servidor en funcionamiento.
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
