import cloud from './assets/cloud.png';
import cloud_day from './assets/cloudy_day.png';
import cloud_night from './assets/cloudy_night.png';
import moon from './assets/moon.png';
import rain_heavy from './assets/rain_heavy.png';
import rain_light from './assets/rain_light.png';
import rain from './assets/rain.png';
import sleet from './assets/sleet.png';
import snow_light from './assets/snow_light.png';
import snow from './assets/snow.png';
import storm from './assets/storm.png';
import sun from './assets/sun.png';

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
    return storm;
  }
  // rain
  if (id.toString()[0] === '3' || id.toString()[0] === '5') {
    if ([300,310,500].includes(id)) {
      return rain_light;
    }
    if ([301,311,501].includes(id)) {
      return rain;
    }
    return rain_heavy;
  }
  // snow
  if ([600,620].includes(id)) {
    return snow_light;
  }
  if ([601,602,621,622].includes(id)){
    return snow;
  }
  // sleet
  if ([611,612,613,615,616].includes(id)){
    return sleet;
  }
  // clear
  if ([800,801].includes(id)) {
    const hour = getHourInLocalTime(weather.dt);
    if (hour >= 6 && hour < 22) {
      return sun;
    } else {
      return moon;
    }
  }
  // partial clouds
  if ([802.803].includes(id)) {
    const hour = getHourInLocalTime(weather.dt);
    if (hour >= 6 && hour < 22) {
      return cloud_day;
    } else {
      return cloud_night;
    }
  }
  // default to cloudy
  return cloud
}

export const getMostImportantWeather = (weathers: WeatherResponse[]) => {
  if (weathers.length === 0) return "";
  const mostImportantWeather = weathers
    .sort((a, b) => (a.weather[0].id > b.weather[0].id) ? 1 : -1)
    [0]

  return getWeatherIcon(mostImportantWeather);
}