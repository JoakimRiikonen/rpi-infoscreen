import { WeatherType } from "./models/WeatherType";
import { getWeatherIcon } from "./weatherHelpers";

export interface LargeWeatherIconProps {
  weatherType: WeatherType;
  hoursUntil: number;
}

export const LargeWeatherIcon = ({ weatherType, hoursUntil }: LargeWeatherIconProps) => {

  const generateInfoString = () => {
    if (hoursUntil === 0) {
      return `${weatherType.toString()} right now`;
    }
    if (hoursUntil === 1) {
      return `${weatherType.toString()} in ${hoursUntil} hour`;
    }
    return `${weatherType.toString()} in ${hoursUntil} hours`;
  }

  return (
    <div className="weather-icon-display">
        <div>
          <i className={"bi-" + getWeatherIcon(weatherType)}></i>
        </div>
        <div className="weather-icon-info-text">
          {generateInfoString()}
        </div>
    </div>
  )
}