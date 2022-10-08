export interface WeatherResponse {
  dt: number,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    humidity: number
  },
  weather: [{
    id: number,
    main: string,
    description: string
  }],
  wind: {
    speed: number,
    deg: number,
    gust: number
  }
}