export interface LargeWeatherIconProps {
  icon: string;
}

export const LargeWeatherIcon = ({ icon }: LargeWeatherIconProps) => {

  return (
    <div className="weather-icon-display">
        <i className={"bi-" + icon}></i>
    </div>
  )
}