import React from "react"
import { WeatherResponse } from "./models/WeatherResponse"
import { convertKelvinToCelsius, getWeatherIcon, getWeatherType } from "./weatherHelpers"

export interface CurrentWeatherProps {
  currentWeather: WeatherResponse | null
}

export const CurrentWeather = ({ currentWeather }: CurrentWeatherProps) => {

  if (!currentWeather){
    return (
      <div>
        error in getting current weather
      </div>
    )
  }

  return(
    <div className="weather-current">
      <div className="weather-current-main">
        <i className={"bi-" + getWeatherIcon(getWeatherType(currentWeather)) + " weather-current-icon"}></i>
        <span>{convertKelvinToCelsius(currentWeather.main.temp)}°</span>
      </div>
      <div className="weather-current-sub">
        <div className="weather-current-wind">
          <i className="bi-wind weather-current-wind-icon" />
          {currentWeather.wind.speed} m/s
        </div>
        <div>
          Feels like {convertKelvinToCelsius(currentWeather.main.feels_like)}°
        </div>
      </div>
    </div>
  )
}