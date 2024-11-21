import dayjs from "dayjs";
import { SpotPriceResponseRow } from "../../../electricity/models/SpotPriceResponse";
import { SpotPriceOnDate, SpotPricesByDate } from "../../../electricity/models/SpotPricesByDate";
import { NextResponse } from "next/server";

export async function GET(
) {
  const url = 'https://api.spot-hinta.fi/TodayAndDayForward'

  const r = await fetch(url);
  const data: SpotPriceResponseRow[] = await r.json();
  const mappedData = mapPricesByDate(data);

  return NextResponse.json(mappedData);
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
      priceWithMargin: row.PriceWithTax + Number(process.env.SPOT_MARGIN)
    }

    pricesByDate[date].push(p);
  })
  
  return pricesByDate;
}