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
      <table className="weather-forecast-table">
        <tbody>
          {forecast.list.slice(0, 5).map(f => (
            <tr key={f.dt} className="weather-forecast-row">
              <td className="weather-forecast-time">
                {getHourInLocalTime(f.dt).toString().padStart(2, '0')}:00
              </td>
              <td className="weather-forecast-icon">
                <i className={"bi-" + getWeatherIcon(f)}></i>
              </td>
              <td>
                {convertKelvinToCelsius(f.main.temp)}°
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}