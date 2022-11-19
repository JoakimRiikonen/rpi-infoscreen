import { useEffect, useState } from "react"
import { getSpotPrices } from "./electricityservice";
import { SpotPricesByDate } from "./models/SpotPricesByDate";
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import dayjs from 'dayjs';
import ElectricityPriceChart from "./ElectricityPriceChart";
import DatePicker from "./DatePicker";

const ElectricityPrice = () => {

  const [spotPrices, setSpotPrices] = useState<SpotPricesByDate>({});
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    updateSpotPrices();

    const reqInterval = setInterval(() => {
      updateSpotPrices();
    }, 15 * 60 * 1000);

    return () => clearInterval(reqInterval);
  }, []);

  const updateSpotPrices = () => {
    console.log('updating spot prices');
    getSpotPrices()
      .then(data => {
        setSpotPrices(data);
        console.log(data);
      })
  }

  return (
    <div>
      <ElectricityPriceChart 
        spotPricesOnDate={spotPrices[selectedDate]}
      />
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        validDates={Object.keys(spotPrices)}
      />
    </div>
  )
}

export default ElectricityPrice;