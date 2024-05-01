import { SensorData } from "./models/SensorData";

export const getSensorData = async () => {
  const url = `${import.meta.env.VITE_SENSOR_SERVER_URL}/sensordata`
  const res = await fetch(url);
  const data: SensorData = await res.json();

  return data;
}