import { useSelector } from "react-redux";

function Forecast() {
  const daily = useSelector((state) => state.weather.daily);

  if (!daily) return null;

  // Transformamos los arrays de la API en un array de días.
  const forecastDays = daily.time.map((date, index) => ({
    date,
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
    precipitation: daily.precipitation_probability_max[index],
  }));

  return (
    <section className="forecast">
      <h2>Previsión de 7 días</h2>

      <div className="forecast-grid">
        {forecastDays.map((day) => (
          <article className="forecast-day" key={day.date}>
            <h3>
              {new Date(`${day.date}T12:00:00`).toLocaleDateString("es-ES", {
                weekday: "short",
                day: "numeric",
              })}
            </h3>

            <p className="forecast-temperatures">
              <strong>{Math.round(day.max)}°</strong>
              <span>{Math.round(day.min)}°</span>
            </p>

            <p>Precipitación: {day.precipitation ?? 0}%</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
