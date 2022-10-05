/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_WEATHER_API_KEY: string,
    REACT_APP_TURKU_LAT: string,
    REACT_APP_TURKU_LON: string,
    REACT_APP_LOCALE: string,
  }
}