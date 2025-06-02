import dayjs from "dayjs";
import { ReadingResponse } from "../../../plants/models/ReadingResponse";
import { NextRequest, NextResponse } from "next/server";
import { ReadingsByDate } from "../../../plants/models/ReadingsByDate";

export async function GET() {
  const url = process.env.BPM_BASE_URL! + '/api/ReadReadings?' + new URLSearchParams({
    from: dayjs().subtract(7, 'days').toISOString(),
    to: dayjs().toISOString(),
  });

  const res = await fetch(url, {
    headers: {
      'x-functions-key': process.env.BPM_API_KEY!
    }
  })
  const data: ReadingResponse[] = await res.json();
  const mappedData = mapReadingsByDate(data);

  return NextResponse.json(mappedData);
}

const mapReadingsByDate = (data: ReadingResponse[]): ReadingsByDate => {
  let readingsByDate: ReadingsByDate = {}
  data.forEach(row => {
    const day = dayjs(row.time);
    const date = day.format('YYYY-MM-DD');

    if (!readingsByDate[date]) {
      readingsByDate[date] = [];
    }

    readingsByDate[date].push(row);
  });

  return readingsByDate;
}