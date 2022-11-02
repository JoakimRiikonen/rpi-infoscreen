import dayjs from 'dayjs'
import { WeatherResponse } from './models/WeatherResponse';

export const convertKelvinToCelsius = (temp: number) => {
  return (temp - 273.15).toFixed(0);
}

export const getHourInLocalTime = (timestamp: number) => {
  return dayjs(timestamp*1000).locale('fi-FI').hour();
}

export const getWeatherIcon = (weather: WeatherResponse) => {
  const id = weather.weather[0].id;
  // storm
  if (id.toString()[0] === '2') {
    return "cloud-lightning";
  }
  // rain
  if (id.toString()[0] === '3' || id.toString()[0] === '5') {
    if ([300,310,500].includes(id)) {
      return "cloud-drizzle";
    }
    if ([301,311,501].includes(id)) {
      return "cloud-rain";
    }
    return "cloud-rain-heavy";
  }
  // snow
  if ([600,601,602,620,621,622].includes(id)){
    return "cloud-snow";
  }
  // sleet
  if ([611,612,613,615,616].includes(id)){
    return "cloud-sleet";
  }
  // clear
  if ([800,801].includes(id)) {
    const hour = getHourInLocalTime(weather.dt);
    if (hour >= 6 && hour < 22) {
      return "sun";
    } else {
      return "moon";
    }
  }
  // partial clouds
  if ([802.803].includes(id)) {
    const hour = getHourInLocalTime(weather.dt);
    if (hour >= 6 && hour < 22) {
      return "cloud-sun";
    } else {
      return "cloud-moon";
    }
  }
  // default to cloudy
  return "cloud"
}

export const getMostImportantWeather = (weathers: WeatherResponse[]) => {
  if (weathers.length === 0) return "";
  const mostImportantWeather = weathers
    .sort((a, b) => (a.weather[0].id > b.weather[0].id) ? 1 : -1)
    [0]

  return getWeatherIcon(mostImportantWeather);
}