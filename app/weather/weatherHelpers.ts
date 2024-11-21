import dayjs from 'dayjs'
import { WeatherResponse } from './models/WeatherResponse';
import { WeatherType } from './models/WeatherType';

export const convertKelvinToCelsius = (temp: number) => {
  return (temp - 273.15).toFixed(0);
}

export const getHourInLocalTime = (timestamp: number) => {
  return dayjs(timestamp*1000).locale('fi-FI').hour();
}

export const getWeatherType = (weather: WeatherResponse): WeatherType => {
  const id = weather.weather[0].id;
  // storm
  if (id.toString()[0] === '2') {
    return WeatherType.Lightning;
  }
  // rain
  if (id.toString()[0] === '3' || id.toString()[0] === '5') {
    if ([300,310,500].includes(id)) {
      return WeatherType.Drizzle;
    }
    if ([301,311,501].includes(id)) {
      return WeatherType.RainLight;
    }
    return WeatherType.RainHeavy;
  }
  // snow
  if ([600,601,602,620,621,622].includes(id)){
    return WeatherType.Snow;
  }
  // sleet
  if ([611,612,613,615,616].includes(id)){
    return WeatherType.Sleet;
  }
  // clear
  if ([800,801].includes(id)) {
    const hour = getHourInLocalTime(weather.dt);
    if (hour >= 6 && hour < 22) {
      return WeatherType.Sunny;
    } else {
      return WeatherType.Moony;
    }
  }
  // partial clouds
  if ([802.803].includes(id)) {
    const hour = getHourInLocalTime(weather.dt);
    if (hour >= 6 && hour < 22) {
      return WeatherType.CloudSunny;
    } else {
      return WeatherType.CloudMoony;
    }
  }
  // default to cloudy
  return WeatherType.Cloudy;
}

export const getWeatherIcon = (weatherType: WeatherType) => {
  switch (weatherType) {
    case WeatherType.Lightning:
      return "cloud-lightning";
    case WeatherType.Drizzle:
      return "cloud-drizzle";
    case WeatherType.RainLight:
      return "cloud-rain";
    case WeatherType.RainHeavy:
      return "cloud-rain-heavy";
    case WeatherType.Snow:
      return "cloud-snow";
    case WeatherType.Sleet:
      return "cloud-sleet";
    case WeatherType.Sunny:
      return "sun";
    case WeatherType.Moony:
      return "moon";
    case WeatherType.CloudSunny:
      return "cloud-sun";
    case WeatherType.CloudMoony:
      return "cloud-moon";
    case WeatherType.Cloudy:
      return "cloud"
    default:
      return "cloud";
  }
}

export const getMostImportantWeather = (weathers: WeatherResponse[]) => {
  if (weathers.length === 0) return WeatherType.Cloudy;
  const mostImportantWeather = weathers
    .sort((a, b) => (a.weather[0].id > b.weather[0].id) ? 1 : -1)
    [0]

  return getWeatherType(mostImportantWeather);
}

export const getHoursUntilMostImporantWeather = (currentWeather: WeatherResponse, forecasts: WeatherResponse[]) => {
  // Get list of indexes of weathers sorted by weather id 
  const result = Array.from(forecasts.keys())
    .sort((a, b) => forecasts[a].weather[0].id - forecasts[b].weather[0].id);

  const mostImportantForecast = forecasts[result[0]];

  if (mostImportantForecast.weather[0].id.toPrecision(1) === currentWeather.weather[0].id.toPrecision(1)) {
    return 0;
  }

  const hoursUntil = (mostImportantForecast.dt - Date.now()/1000) / (60*60);
  return Math.floor(hoursUntil);
}