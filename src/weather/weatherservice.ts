import { ForecastResponse } from "./models/ForecastResponse";
import { WeatherResponse } from "./models/WeatherResponse";

export const getCurrent = async () => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?' + new URLSearchParams({
    lat: import.meta.env.VITE_TURKU_LAT,
    lon: import.meta.env.VITE_TURKU_LON,
    appid: import.meta.env.VITE_WEATHER_API_KEY
  })

  const res = await fetch(url);
  const data: WeatherResponse = await res.json();

  return data
}

export const getForecast = async () => {
  const url = 'https://api.openweathermap.org/data/2.5/forecast?' + new URLSearchParams({
    lat: import.meta.env.VITE_TURKU_LAT,
    lon: import.meta.env.VITE_TURKU_LON,
    appid: import.meta.env.VITE_WEATHER_API_KEY
  })

  const res = await fetch(url);
  const data: ForecastResponse = await res.json();

  return data
}