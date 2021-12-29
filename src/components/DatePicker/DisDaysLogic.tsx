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
    start_day: '2021-11-20T19:00:00.000Z',
    end_day: '2021-11-20T19:00:00.000Z',
    type: 'sick_leave',
    status: 'pending',
    userId: 1,
  },
  {
    id: 2,
    start_day: '2021-12-20T19:00:00.000Z',
    end_day: '2021-12-20T19:00:00.000Z',
    type: 'sick_leave',
    status: 'pending',
    userId: 1,
  },
  {
    id: 3,
    start_day: '2022-01-19T19:00:00.000Z',
    end_day: '2022-01-20T19:00:00.000Z',
    type: 'vacation',
    status: 'pending',
    userId: 2,
  },
  {
    id: 4,
    start_day: '2022-01-25T19:00:00.000Z',
    end_day: '2022-01-26T19:00:00.000Z',
    type: 'vacation',
    status: 'pending',
    userId: 2,
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
  useEffect(() => {
    console.log('user', userData.id);
    console.log('vacation', dayOffData);
    onChangeDay([data.start, data.end]);
    // getDayOffById(userData.id).then((vacations) => {
    //   setDayOff(vacations);
    //   console.log(dayOff);
    // });
    //  return () => {
    setDayOff(dayOffData);
    if (dayOff !== []) {
      const filterVocation = dayOff.filter((obj) => obj.type === type);
      setCurrentType(filterVocation);
      console.log(filterVocation, 'Console filter');
    }
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
  const createdData = () => {
    // console.log(dataВ.year);
    // if (!dataВ.year) {
    //   const nD = {
    //     year: parseInt(created, 10),
    //     month: 2 + createdData().month,
    //     day: createdData().day,
    //   };
    //   // const newData = parseInt(created, 10);
    //   console.log(nD, 'new');
    // }
    // const nD = {
    //   year: parseInt(created, 10),
    //   month: 2 + createdData().month,
    //   day: createdData().day,
    // };
    if (type === 'vacation') {
      console.log('Vacation');
      if (dayOff === []) {
        const newYear = parseInt(userData.created_at, 10);
        const newMounth = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
        const newDay = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);

        const a = {
          year: newYear,
          month: newMounth,
          day: newDay,
        };
        disabledDays.push(a);
        console.log(disabledDays, 'блоки');
        return a;
      }
      if (currentType.length > 0) {
        const lastDayOff = currentType[currentType.length - 1];

        const newYear = parseInt(lastDayOff.end_day, 10);
        const newMounth = parseInt(lastDayOff.end_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
        const newDay = parseInt(lastDayOff.end_day.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);

        const a = {
          year: newYear,
          month: newMounth,
          day: newDay,
        };
        disabledDays.push(a);
        console.log(disabledDays, 'блоки');
        return a;
      }
    }
    if (type === 'sick_leave') {
      console.log('sick_leave');
      if (dayOff === []) {
        const newYear = parseInt(userData.created_at, 10);
        const newMounth = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(5), 10);
        const newDay = parseInt(userData.created_at.replace(/[^a-zа-яё0-9\s]/gi, ' ').slice(8), 10);

        const a = {
          year: newYear,
          month: newMounth,
          day: newDay,
        };
        console.log(disabledDays, 'блоки');
        return a;
      }
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
    month: 2 + createdData().month,
    day: createdData().day,
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
