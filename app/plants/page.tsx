'use client'

import { useEffect, useState } from "react";
import DatePicker from "../_components/DatePicker";
import { readReadings } from './bpmservice';
import ReadingsChart from './ReadingsChart';
import dayjs from "dayjs";
import { ReadingsByDate } from "./models/ReadingsByDate";

export default function Plants() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const validDates = [-6, -5, -4, -3, -2, -1, 0].map(d => dayjs().add(d, 'day').format('YYYY-MM-DD'));
  const [data, setData] = useState<ReadingsByDate>({});

  useEffect(() => {
    updateData();

    const reqInterval = setInterval(() => {
      updateData();
    }, 15 * 60 * 1000);

    return () => clearInterval(reqInterval);
  }, []);

  const updateData = () => {
    console.log('updating plant data');
    readReadings()
      .then(data => {
        console.log(data);
        setData(data)
      })
  }

  return (
    <div>
      <ReadingsChart 
        readingsOnDate={data[selectedDate]}
        selectedDate={selectedDate}
      />
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        validDates={validDates}
      />
    </div>
  )
}