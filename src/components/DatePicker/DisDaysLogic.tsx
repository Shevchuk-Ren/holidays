import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {
  Calendar, DayRange,
} from 'react-modern-calendar-datepicker';
// import getDayOffById from 'services/api/getdayOffApi';
import { store } from 'store';
// import DataBooking from '.';

const data = {
  start: '2022-1-5',
  end: '2022-1-6',
};
const dayOffData = [
  {
    id: 1,
    start_day: '2021-12-10T19:00:00.000Z',
    end_day: '2021-12-10T19:00:00.000Z',
    type: 'sick_leave',
    status: 'pending',
    userId: 1,
  },
  {
    id: 2,
    start_day: '2022-01-02T19:00:00.000Z',
    end_day: '2022-01-02T19:00:00.000Z',
    type: 'sick_leave',
    status: 'pending',
    userId: 1,
  },
  {
    id: 3,
    start_day: '2021-12-19T19:00:00.000Z',
    end_day: '2021-12-20T19:00:00.000Z',
    type: 'vacation',
    status: 'pending',
    userId: 1,
  },
  {
    id: 4,
    start_day: '2021-12-25T19:00:00.000Z',
    end_day: '2021-12-26T19:00:00.000Z',
    type: 'vacation',
    status: 'pending',
    userId: 1,
  },
  {
    id: 5,
    start_day: '2022-01-01T19:00:00.000Z',
    end_day: '2022-01-06T19:00:00.000Z',
    type: 'workToAnotherDay',
    status: 'pending',
    userId: 1,
  },
];
const disabledDays = [{
  year: 2000,
  month: 0,
  day: 0,
}];
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
    day: 1,
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
  const { userData } = store.getState().user;
  const [selectedDay, setSelectedDay] = useState<DayRange>(defaultValue);
  const [dayOff, setDayOff] = useState<any[]>([]);
  const [currentType, setCurrentType] = useState<any>([]);
  const [customDays, setCustomDays] = useState<any>([]);

  const custom = [{
    year: 0,
    month: 0,
    day: 0,
    className: 'purpleDay',
  }];
  useEffect(() => {
    console.log('user', userData.id);
    console.log('vacation', dayOffData);
    onChangeDay([data.start, data.end]);

    setDayOff(dayOffData);
  }, [type]);

  useEffect(() => {
    console.log('Filter here');
    if (dayOff.length !== 0) {
      const filterVocation = dayOff.filter((obj) => obj.type === type);
      setCurrentType(filterVocation);
      console.log(filterVocation, 'filterVocation');
      if (filterVocation) {
        const filt = filterVocation.map((obj) => {
          if (parseInt(obj.end_day, 10) === moment().year()
            || parseInt(obj.end_day, 10) === 1 + moment().year()) {
            const day = parseInt(obj.start_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);
            const month = parseInt(obj.start_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
            const dayEnd = parseInt(obj.end_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);
            const monthEnd = parseInt(obj.end_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
            const year = parseInt(obj.start_day, 10);
            const yearEnd = parseInt(obj.end_day, 10);
            custom.push({
              year,
              month,
              day,
              className: 'purpleDay',
            });
            custom.push({
              year: yearEnd,
              month: monthEnd,
              day: dayEnd,
              className: 'purpleDay',
            });
            return obj;
          }
          return obj;
        });
        console.log(filt, 'map');
      }
      setCustomDays(custom);
      console.log(customDays, 'array');
    }
  }, [type, dayOff]);
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
  const createdData = () => {
    console.log(customDays, 'array creaty');
    if (type === 'vacation') {
      console.log('Vacation', currentType);
      if (currentType === []) {
        const newYear = parseInt(userData.created_at, 10);
        const newMounth = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
        const newDay = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);

        const a = {
          year: newYear,
          month: 2 + newMounth,
          day: newDay,
        };
        return a;
      }
      if (currentType.length > 0) {
        const lastDayOff = currentType[currentType.length - 1];

        const newYear = parseInt(lastDayOff.end_day, 10);
        const newMounth = parseInt(lastDayOff.end_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
        const newDay = parseInt(lastDayOff.end_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);

        const a = {
          year: newYear,
          month: 2 + newMounth,
          day: newDay,
        };
        return a;
      }
    }
    if (type === 'sick_leave') {
      console.log('sick_leave');
      if (currentType === []) {
        const a = {
          year: moment().year(),
          month: 1 + moment().month(),
          day: moment().date(),
        };
        return a;
      }
      if (currentType.length > 0) {
        const lastDayOff = currentType[currentType.length - 1];
        const newYear = parseInt(lastDayOff.end_day, 10);
        const newMounth = parseInt(lastDayOff.end_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);

        const a = {
          year: newYear,
          month: newMounth,
          day: 1,
        };
        return a;
      }
    }
    if (type === 'workToAnotherDay' || type === 'ownExpense') {
      console.log('workToAnotherDay');
      const a = {
        year: moment().year(),
        month: 1 + moment().month(),
        day: moment().date(),
      };
      console.log('workToAnotherDay', a);
      return a;
    }
    const newYear = parseInt(userData.created_at, 10);
    const newMounth = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
    const newDay = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);

    const a = {
      year: newYear,
      month: newMounth,
      day: newDay,
    };
    return a;
  };
  const minimumDate = {
    year: createdData().year,
    month: parseFloat(`${type === 'sick_leave' ? 1 + createdData().month : createdData().month}`),
    day: createdData().day,
  };

  const maximumDate = {
    year: 2 + moment().year(),
    month: 0,
    day: 31,
  };
  // const customDays = [
  //   {
  //     year: createdData().year,
  //     month: createdData().month,
  //     day: createdData().day,
  //     className: 'purpleDay',
  //   },
  //   {
  //     year: 2022, month: 1, day: 7, className: 'orangeDay',
  //   },
  //   {
  //     year: 2019, month: 3, day: 18, className: 'yellowDay',
  //   },
  //   {
  //     year: 2019, month: 3, day: 26, className: 'navyBlueDay',
  //   },
  // ];
  return (
    <Calendar
      value={selectedDay}
      onChange={onChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      // disabledDays={disabledDays(type)}
      disabledDays={disabledDays}
      shouldHighlightWeekends
      customDaysClassName={customDays}
    />
  );
};
export default CalendarSelect;
