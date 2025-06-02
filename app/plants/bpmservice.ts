import { ReadingsByDate } from "./models/ReadingsByDate";

export const readReadings = async () => {
  const url = '/api/bpm/getreadings'

  const res = await fetch(url);
  const data: ReadingsByDate = await res.json();

  return data;
}