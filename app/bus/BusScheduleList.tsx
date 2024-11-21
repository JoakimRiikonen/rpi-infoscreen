import { useState } from 'react';
import BusSchedulePopup from './BusSchedulePopup';
import stopsToList from './stopsToList.json';

const BusScheduleList = () => {

  const [shownStop, setShownStop] = useState<{code: number, name: string} | undefined>(undefined);
  
  return (
    <div className='bus-schedule'>
      <ul className='bus-schedule-list'>
      {stopsToList.stops.map(s => (
        <li
          className='bus-schedule-list-item'
          key={s.code}
          onClick={() => setShownStop(s)}
        >
          {s.name}
        </li>
      ))}
      </ul>

      {shownStop && (
        <BusSchedulePopup
          stopCode={shownStop.code}
          stopName={shownStop.name}
          closePopup={() => setShownStop(undefined)}
        />
      )}
    </div>
  )
}

export default BusScheduleList;