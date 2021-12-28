import React, { FC, useState } from 'react';
import moment from 'moment';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {
  Calendar, DayRange,
} from 'react-modern-calendar-datepicker';

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
  const defaultFrom:ISickDay = {
    year: moment().year(),
    month: (1 + moment().month()),
    day: moment().date(),
  };
  const defaultTo:ISickDay = {
    year: moment().year(),
    month: (1 + moment().month()),
    day: moment().date(),
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };
  const [selectedDay, setSelectedDay] = useState<DayRange>(defaultValue);

  const onChange = (value:SelectedDays) => {
    setSelectedDay(value);
    const start = `${value.from.year}-${value.from.month}-${value.from.day}`;
    const end = `${value.to.year}-${value.to.month}-${value.to.day}`;
    onChangeDay([start, end]);
    console.log(type, 'start', start, 'end', end);
  };

  const minimumDate = {
    year: moment().year(),
    month: 1 + moment().month(),
    day: moment().date(),
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
      shouldHighlightWeekends
    />
  );
};
export default CalendarSelect;
