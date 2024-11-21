import React, { useRef } from "react"
import { useDraggable } from "react-use-draggable-scroll";
import { ForecastResponse } from "./models/ForecastResponse"
import { convertKelvinToCelsius, getHourInLocalTime, getWeatherIcon, getWeatherType } from "./weatherHelpers"

export interface ForecastProps {
  forecast: ForecastResponse | null
}

export const Forecast = ({ forecast }: ForecastProps) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  if (!forecast) {
    return (
      <div {...events} ref={ref}>
        <span>Error getting forecast</span>
      </div>
    )
  }

  return (
    <div className="weather-forecast" {...events} ref={ref}>
      <table className="weather-forecast-table">
        <tbody>
          {forecast.list.slice(0, 12).map(f => (
            <tr key={f.dt} className="weather-forecast-row">
              <td className="weather-forecast-time">
                {getHourInLocalTime(f.dt).toString().padStart(2, '0')}:00
              </td>
              <td className="weather-forecast-wind-icon">
                <i className={"bi-wind"}></i>
              </td>
              <td className="weather-forecast-wind">
                {f.wind.speed.toFixed(1)}
              </td>
              <td className="weather-forecast-icon">
                <i className={"bi-" + getWeatherIcon(getWeatherType(f))}></i>
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