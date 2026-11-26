import { useSelector } from "react-redux";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function WeatherChart() {
  // Recuperamos la previsión diaria desde Redux.
  const daily = useSelector((state) => state.weather.daily);

  // Si todavía no hay datos, no mostramos el gráfico.
  if (!daily || !daily.time) return null;

  // Transformamos los datos de Open-Meteo
  // al formato que necesita Recharts.
  const chartData = daily.time.map((date, index) => ({
    date: new Date(`${date}T12:00:00`).toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
    }),
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
  }));

  return (
    <section className="weather-chart">
      <h2>Evolución de temperaturas</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />

          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} unit="°" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f8fafc",
            }}
            formatter={(value) => [`${value} °C`]}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="max"
            name="Temperatura máxima"
            stroke="#f87171"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="min"
            name="Temperatura mínima"
            stroke="#60a5fa"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default WeatherChart;
