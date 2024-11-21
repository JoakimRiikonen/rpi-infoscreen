import dayjs from "dayjs";
import { useEffect, useState,  } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ScheduleData, ScheduleRow } from "./models/ScheduleData";

export interface BusSchedulePopup {
  stopCode: number;
  stopName: string;
  closePopup: () => void;
}

const BusSchedulePopup = ({ stopCode, stopName, closePopup }: BusSchedulePopup) => {

  dayjs.extend(customParseFormat);

  const [stopData, setStopData] = useState<ScheduleRow[]>([]);

  useEffect(() => {
    const getData = async () => {
      const currentDate = dayjs().format('YYYYMMDD');
      const data: ScheduleData = await import(`./data/${stopCode}.json`);

      const currentDayData = data.default[currentDate];

      const currentTime = dayjs().format('HH:mm:ss');
      const i = currentDayData.findIndex(s => s.departure_time > currentTime);
      setStopData(currentDayData.slice(i, i+8));
    }

    getData();
  }, [])

  return (
    <div className="bus-schedule-popup">
      <button 
        className="bus-schedule-popup-close"
        onClick={closePopup}
      >
        <i className="bi-x-square"></i>
      </button>
      <h1 className="bus-schedule-popup-title">{stopCode} {stopName}</h1>
      <table className="bus-schedule-table">
        <tbody>
          {stopData.map((stop, i) => (
            <tr
              key={i}
              className="bus-schedule-table-row"
            >
              <td className="bus-schedule-table-time">
                {stop.departure_time.substring(0,5)}
              </td>
              <td className="bus-schedule-table-route-number">
                {stop.route_short_name}
              </td>
              <td className="bus-schedule-table-route-name">
                {stop.trip_headsign}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BusSchedulePopup;