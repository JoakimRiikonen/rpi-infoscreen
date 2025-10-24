import { SpotPricesByDate } from './models/SpotPricesByDate';

export const getSpotPrices = async () => {
  const url = '/api/electricity/spotprices'

  const res = await fetch(url);
  const data: SpotPricesByDate = await res.json();

  return data;
}