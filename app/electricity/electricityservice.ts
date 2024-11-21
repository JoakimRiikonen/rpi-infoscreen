import { SpotPriceResponseRow } from './models/SpotPriceResponse';
import { SpotPriceOnDate, SpotPricesByDate } from './models/SpotPricesByDate';
import dayjs from 'dayjs';

export const getSpotPrices = async () => {
  const url = '/api/electricity/spotprices'

  const res = await fetch(url);
  const data: SpotPricesByDate = await res.json();

  return data;
}