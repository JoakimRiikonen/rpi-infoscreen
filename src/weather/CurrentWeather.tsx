import React from "react"
import { WeatherResponse } from "./models/WeatherResponse"
import { convertKelvinToCelsius, getWeatherIcon } from "./weatherHelpers"

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
      {convertKelvinToCelsius(currentWeather.main.temp)}°
      <img src={getWeatherIcon(currentWeather)} alt="Current weather icon"></img>
    </div>
  )
}