export interface LargeWeatherIconProps {
  icon: string;
}

export const LargeWeatherIcon = ({ icon }: LargeWeatherIconProps) => {

  return (
    <div className="weather-icon-display">
      <img
        src={icon}
        className="weather-icon-large"
        alt="Large weather icon"
      />
    </div>
  )
}