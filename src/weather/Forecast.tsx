import React from "react"
import { ForecastResponse } from "./models/ForecastResponse"
import { convertKelvinToCelsius, getHourInLocalTime, getWeatherIcon } from "./weatherHelpers"

export interface ForecastProps {
  forecast: ForecastResponse | null
}

export const Forecast = ({ forecast }: ForecastProps) => {
  if (!forecast) {
    return (
      <div>
        Error getting forecast
      </div>
    )
  }

  return (
    <div className="weather-forecast">
      {forecast.list.slice(0, 5).map(f => (
        <div key={f.dt} className="weather-forecast-row">
          {getHourInLocalTime(f.dt).toString().padStart(2, '0')}:00 {convertKelvinToCelsius(f.main.temp)}°
          <img 
            className="weather-forecast-image"
            src={getWeatherIcon(f)}
            alt="Forecast icon"
            />
        </div>
      ))}
    </div>
  )
}