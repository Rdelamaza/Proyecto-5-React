// src/components/Weather.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import locations from "./locations";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Weather = () => {
  const [region, setRegion] = useState("Región Metropolitana de Santiago");
  const [city, setCity] = useState("Santiago");
  const [coordinates, setCoordinates] = useState({ lat: -33.4489, lon: -70.6693 });
  const [weather, setWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeather(data.current_weather);
        setDailyForecast(data.daily);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [coordinates]);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
    const firstCity = locations.Chile[selectedRegion][0];
    setCity(firstCity.name);
    setCoordinates({ lat: firstCity.lat, lon: firstCity.lon });
  };

  const handleCityChange = (e) => {
    const selectedCity = locations.Chile[region].find(
      (c) => c.name === e.target.value
    );
    setCity(selectedCity.name);
    setCoordinates({ lat: selectedCity.lat, lon: selectedCity.lon });
  };

  const chartData = dailyForecast
    ? dailyForecast.time.map((time, index) => ({
        date: time,
        maxTemp: dailyForecast.temperature_2m_max[index],
        minTemp: dailyForecast.temperature_2m_min[index],
      }))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Weather App - Chile
        </h1>

        {/* Botón para volver a la página de inicio */}
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mb-6 inline-block"
        >
          Volver al Inicio
        </Link>

        {/* Selectores de región y ciudad */}
        <div className="space-y-4 mb-6">
          <select
            value={region}
            onChange={handleRegionChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(locations.Chile).map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>

          <select
            value={city}
            onChange={handleCityChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {locations.Chile[region].map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Información del clima */}
        {weather && dailyForecast && (
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Weather in {city}
            </h3>
            <div className="space-y-2">
              <p className="text-lg text-gray-700">
                Current Temperature:{" "}
                <span className="font-bold">{weather.temperature}°C</span>
              </p>
              <p className="text-lg text-gray-700">
                Max Temperature:{" "}
                <span className="font-bold">
                  {dailyForecast.temperature_2m_max[0]}°C
                </span>
              </p>
              <p className="text-lg text-gray-700">
                Min Temperature:{" "}
                <span className="font-bold">
                  {dailyForecast.temperature_2m_min[0]}°C
                </span>
              </p>
              <p className="text-lg text-gray-700">
                Precipitation:{" "}
                <span className="font-bold">
                  {dailyForecast.precipitation_sum[0]} mm
                </span>
              </p>
              <p className="text-lg text-gray-700">
                Wind Speed:{" "}
                <span className="font-bold">{weather.windspeed} km/h</span>
              </p>
              <p className="text-lg text-gray-700">
                Conditions:{" "}
                <span className="font-bold">{weather.weathercode}</span>
              </p>
            </div>
          </div>
        )}

        {/* Gráfico de temperatura */}
        {dailyForecast && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Temperature Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="maxTemp"
                  stroke="#8884d8"
                  name="Max Temperature"
                />
                <Line
                  type="monotone"
                  dataKey="minTemp"
                  stroke="#82ca9d"
                  name="Min Temperature"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;