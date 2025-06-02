import dayjs from 'dayjs';

export interface DatePickerProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  validDates: string[];
}

const DatePicker = ({ selectedDate, setSelectedDate, validDates }: DatePickerProps) => {

  const hasPrevDate = () => {
    return validDates.indexOf(selectedDate) !== 0;
  }

  const hasNextDate = () => {
    return validDates.indexOf(selectedDate) !== validDates.length - 1;
  }

  return (
    <div className='electricity-price-date-picker'>
      <button
        className='electricity-price-date-picker-button'
        onClick={() => setSelectedDate(validDates[validDates.indexOf(selectedDate)-1])}
        disabled={!hasPrevDate()}
      >
        <i className="bi-arrow-left"></i>
      </button>
      <div className='electricity-price-date-picker-date'>
        {dayjs(selectedDate).format('ddd DD.MM')}
      </div>
      <button
        className='electricity-price-date-picker-button'
        onClick={() => setSelectedDate(validDates[validDates.indexOf(selectedDate)+1])}
        disabled={!hasNextDate()}
      >
        <i className="bi-arrow-right"></i>
      </button>
    </div>
  )
}

export default DatePicker;