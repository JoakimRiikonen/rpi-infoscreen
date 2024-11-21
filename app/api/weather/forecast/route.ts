import { NextResponse } from "next/server";
import { WeatherResponse } from "../../../weather/models/WeatherResponse";

export async function GET(
) {
  const url = 'https://api.openweathermap.org/data/2.5/forecast?' + new URLSearchParams({
    lat: process.env.TURKU_LAT!,
    lon: process.env.TURKU_LON!,
    appid: process.env.WEATHER_API_KEY!
  })

  const r = await fetch(url);
  const data: WeatherResponse = await r.json();

  return NextResponse.json(data);
}