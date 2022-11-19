import { SpotPriceResponseRow } from './models/SpotPriceResponse';
import { SpotPriceOnDate, SpotPricesByDate } from './models/SpotPricesByDate';
import dayjs from 'dayjs';

export const getSpotPrices = async () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/spotprices`
  const res = await fetch(url);
  const data: SpotPriceResponseRow[] = await res.json();

  return mapPricesByDate(data);
}

const mapPricesByDate = (data: SpotPriceResponseRow[]): SpotPricesByDate => {
  let pricesByDate: SpotPricesByDate = {};
  data.forEach(row => {
    const day = dayjs(row.DateTime);
    const date = day.format('YYYY-MM-DD');
    if (!pricesByDate[date]) {
      pricesByDate[date] = [];
    }
    const p: SpotPriceOnDate = {
      hour: day.hour(),
      priceNoTax: row.PriceNoTax,
      priceWithTax: row.PriceWithTax,
      priceWithMargin: row.PriceWithTax + Number(process.env.REACT_APP_SPOT_MARGIN)
    }

    pricesByDate[date].push(p);
  })
  
  return pricesByDate;
}