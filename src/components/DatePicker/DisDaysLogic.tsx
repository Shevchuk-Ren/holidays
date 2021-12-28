import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {
  Calendar, DayRange,
} from 'react-modern-calendar-datepicker';

const data = {
  start: '2022-1-5',
  end: '2022-1-6',
};
const dataВ = {
  year: 2022,
  month: 1,
  day: 5,
};
const disabledDays = [
  {
    year: 2021,
    month: 12,
    day: 20,
  },
  {
    year: 2021,
    month: 1,
    day: 8,
  },
  {
    year: 2022,
    month: 1,
    day: 7,
  },
];
export interface IBookDay {
  id: number;
  start_day: string;
  end_day: string
  type: string
  status: string
  userId: number;
}
export type IBookInfo = IBookDay[];

export interface IDayBooking {
  start: string,
  end: string,
}
export type IDaysBooking = {
  sick: IDayBooking[];
  vacation:IDayBooking[];
};
export interface ISickDay {
  year: number;
  month: number;
  day: number;
}
export type SickDaysArr = ISickDay[];
export interface ISelected {
  year: number,
  month: number,
  day: number,
}
export type SelectedDays = {
  from: ISelected,
  to: ISelected,
};
interface P {
  type: string;
  onChangeDay: (value:[string, string]) => void;
}
const CalendarSelect: FC<P> = ({
  type,
  onChangeDay,
}) => {
  // const defaultFrom:ISickDay = {
  //   year: moment().year(),
  //   month: (1 + moment().month()),
  //   day: moment().date(),
  // };
  // const defaultTo:ISickDay = {
  //   year: moment().year(),
  //   month: (1 + moment().month()),
  //   day: moment().date(),
  // };
  // const defaultValue = {
  //   from: defaultFrom,
  //   to: defaultTo,
  // };
  const defaultFrom:ISickDay = {
    year: 2021,
    month: 12,
    day: 29,
  };
  const defaultTo:ISickDay = {
    year: 2022,
    month: 1,
    day: 3,
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };
  const [selectedDay, setSelectedDay] = useState<DayRange>(defaultValue);
  useEffect(() => {
    console.log('hey', type);
    onChangeDay([data.start, data.end]);
    //  return () => {

    //  }
  }, []);
  const onChange = (value:SelectedDays) => {
    console.log(type);
    setSelectedDay(value);
    const start = `${value.from.year}-${value.from.month}-${value.from.day}`;
    if (value.to) {
      const end = `${value.to.year}-${value.to.month}-${value.to.day}`;
      onChangeDay([start, end]);
      console.log(type, 'start', start, 'end', end);
    }
  };

  const minimumDate = {
    year: dataВ.year,
    month: 2 + dataВ.month,
    day: dataВ.day,
  };

  const maximumDate = {
    year: 2 + moment().year(),
    month: 0,
    day: 31,
  };
  return (
    <Calendar
      value={selectedDay}
      onChange={onChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      // disabledDays={disabledDays(type)}
      disabledDays={disabledDays}
      shouldHighlightWeekends
      customDaysClassName={[
        {
          year: 2021, month: 12, day: 15, className: 'purpleDay',
        },
        {
          year: 2022, month: 1, day: 7, className: 'orangeDay',
        },
        {
          year: 2019, month: 3, day: 18, className: 'yellowDay',
        },
        {
          year: 2019, month: 3, day: 26, className: 'navyBlueDay',
        },
      ]}
    />
  );
};
export default CalendarSelect;
