import { ForecastResponse } from "./models/ForecastResponse";
import { WeatherResponse } from "./models/WeatherResponse";

export const getCurrent = async () => {
  const url = '/api/weather/current'

  const res = await fetch(url);
  const data: WeatherResponse = await res.json();

  return data
}

export const getForecast = async () => {
  const url = '/api/weather/forecast'

  const res = await fetch(url);
  const data: ForecastResponse = await res.json();

  return data
}