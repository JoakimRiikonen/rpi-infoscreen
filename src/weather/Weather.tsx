import React, { useState, useEffect } from "react";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { LargeWeatherIcon } from "./LargeWeatherIcon";
import { ForecastResponse } from "./models/ForecastResponse";
import { WeatherResponse } from "./models/WeatherResponse";
import { getCurrent, getForecast } from "./weatherservice";
import { getMostImportantWeather } from "./weatherHelpers";

const Weather = () => {

  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  useEffect(() => {
    updateForecast();
    updateCurrentWeather();

    const reqInterval = setInterval(() => {
      updateForecast();
      updateCurrentWeather();
    }, 5 * 60 * 1000)

    return () => clearInterval(reqInterval)
  }, [])

  const updateCurrentWeather = () => {
    console.log("update weather");
    getCurrent()
      .then((data) => {
        setCurrentWeather(data)
      })
  }

  const updateForecast = () => {
    console.log("update forecast");
    getForecast()
      .then((data) => {
        setForecast(data)
      })
  }

  return(
    <div className="weather-page">
      <LargeWeatherIcon icon={getMostImportantWeather(forecast ? forecast?.list.slice(0,3) : [])} />
      <div className="line-vertical"></div>
      <div className="weather-data">
        <CurrentWeather currentWeather={currentWeather}/>
        <div className="line-right"></div>
        <Forecast forecast={forecast}/>
      </div>
    </div>
  )
}

export default Weather