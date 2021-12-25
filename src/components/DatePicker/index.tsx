import React, { FC, useState } from 'react';
import { Select, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
// import { RangeValue } from 'rc-picker/lib/interface.d';
import moment from 'moment';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import {
  SubmitButton, CalendarBlock, SelectBlock, HeaderBlock,
} from './styled';
// const { RangePicker } = DatePicker;
const { Option } = Select;

interface IBookDay {
  id: number;
  start_day: string;
  end_day: string
  type: string
  status: string
  userId: number;
}
type IBookInfo = IBookDay[];

interface IDayBooking {
  start: string,
  end: string,
}
type IDaysBooking = {
  sick: IDayBooking[];
  vacation:IDayBooking[];
};
interface ISickDay {
  year: number;
  month: number;
  day: number;
}
const DataBooking: FC = () => {
  const [type, setType] = useState<string>('vacation');
  // const [date, setDate] = useState<[ string, string ]>(['', '']);

  // const userId: number = 45;

  const onChangeRestType = (value: any) => setType(value);
  // const onSelectRestDays = (
  //   values: RangeValue<Moment>,
  //   dateString: [ string, string ],
  // ): void => setDate(dateString);
  // const [startDate, endDate]: Array<string> = date;
  // const days = { type, startDate, endDate };
  // console.log(days, userId);
  // const book: () => Promise<AxiosResponse<TBookkHoliday, IMatchParams>> = () =>
  // bookigRestDays(days, userId);

  const defaultFrom = {
    year: moment().year(),
    month: (1 + moment().month()),
    day: moment().date(),
  };
  const defaultTo = {
    year: moment().year(),
    month: (1 + moment().month()),
    day: moment().date(),
  };
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFrom,
    to: defaultTo,
  });
  // временно добавленная информация об daysOff, будет заменена ответом на запрос из базы по id//
  const bookingInformation:IBookInfo = [
    {
      id: 1,
      start_day: '2021-11-20T19:00:00.000Z',
      end_day: '2021-11-20T19:00:00.000Z',
      type: 'sick_leave',
      status: 'pending',
      userId: 23,
    },
    {
      id: 2,
      start_day: '2021-12-20T19:00:00.000Z',
      end_day: '2021-12-20T19:00:00.000Z',
      type: 'sick_leave',
      status: 'pending',
      userId: 23,
    },
    {
      id: 3,
      start_day: '2022-01-19T19:00:00.000Z',
      end_day: '2022-01-20T19:00:00.000Z',
      type: 'vacation',
      status: 'pending',
      userId: 23,
    },
    {
      id: 4,
      start_day: '2021-01-19T19:00:00.000Z',
      end_day: '2021-01-20T19:00:00.000Z',
      type: 'vacation',
      status: 'pending',
      userId: 23,
    },

  ];
  // ф-я для получения объекта с daysOff по типам//
  const hasBooking = (data:IBookInfo) => {
    const daysBooking:IDaysBooking = {
      sick: [],
      vacation: [],
    };
    data.map((el:IBookDay) => {
      if (el.type === 'vacation') {
        daysBooking.vacation.push({ start: el.start_day, end: el.end_day });
      }
      if (el.type === 'sick_leave') {
        daysBooking.sick.push({ start: el.start_day, end: el.end_day });
      }
      return daysBooking;
    });
    return daysBooking;
  };
  // получение уже выбранных дней пользователя в объекте daysBooking//
  const userHasBooking = hasBooking(bookingInformation);
  // ф-я вспомю для получения массива дней для отключения выбора в календаре по типу sickDay//
  const sickArr = (Year:number, Month:number) => {
    const end = +moment().year(Year).month(Month).date(0)
      .format('DD');
    const start = +moment().year(Year).month(Month - 1).date(1)
      .format('DD');
    const result = [];

    for (let i = start; i <= end; i + 1) {
      const sicDay:ISickDay[] = {
        year: Year,
        month: Month,
        day: i,
      };
      result.push(sicDay);
    }
    return result;
  };

  // получения массива дней для отключения выбора в календаре по типу sickDay
  const disabledSick = (arr) => {
    const { sick } = arr;
    const sickDisMonth = 1 + moment(sick[sick.length - 1].end).month();
    const sickDisYear = moment(sick[sick.length - 1].end).year();
    return sickArr(sickDisYear, sickDisMonth);
  };

  // ф-я для получения границ для отпусков
  // function disabledVacation(arr):string[][] {
  //   const { vacation } = arr;
  //   const vacDis = [];
  //   for (const el of vacation) {
  //     const disBeforeStart:string = moment(el.start).day(-60).format('YY-MM-DD');
  //     const disBeforeEnd:string = moment(el.start).format('YYYY-MM-DD');
  //     const disAfterStart:string = moment(el.end).format('YYYY-MM-DD');
  //     const disAfterEnd:string = moment(el.end).day(60).format('YYYY-MM-DD');
  //     vacDis.push([disBeforeStart, disBeforeEnd]);
  //     vacDis.push([disAfterStart, disAfterEnd]);
  //   }
  //   return vacDis;
  // }
  // disabledVacation(userHasBooking);
  // получаем неактивные дни для больничного
  const disSickMonth: {
    year: number;
    month: number;
    day: number;
  }[] = disabledSick(userHasBooking);
  // отключение прошлых дат
  function disabledPastDate(current:any) {
    return current && current < moment().endOf('day');
  }
  console.log(disabledPastDate(moment()));
  // в планах из этой функции сделать switch для получения неактивных дней  по типу отпуска
  const disabledDays = (dSick, dPastDate, restType) => {
    if (restType === 'sick') {
      const result = [...dSick, ...dPastDate];
      return result;
    }

    return disabledPastDate;
  };

  const handleDisabledSelect = (disabledDay) => {
    console.log('Tried including a disabled day', disabledDay);
  };

  return (
    <CalendarBlock>
      <HeaderBlock>
        <SelectBlock
          size="large"
          defaultValue={type}
          onSelect={(typeRest: any):void => onChangeRestType(typeRest)}
        >
          <Option value="vacation" key="vacation">
            Vacation
          </Option>
          <Option value="sick" key="sick">
            Sick leave
          </Option>
          <Option value="workToAnotherDay" key="workToAnotherDay">
            To work another days
          </Option>
          <Option value="ownExpense" key="ownExpense">
            At your own expense
          </Option>
        </SelectBlock>
        <SubmitButton htmlType="submit" type="primary" size="large" onClick={() => console.log('clicked')}>
          Submit
        </SubmitButton>
      </HeaderBlock>
      <div>
        <ConfigProvider>
          <Calendar
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            disabledDays={disabledDays(disSickMonth, disabledPastDate(moment()), 'sick')} // here we pass them
            onDisabledDayError={handleDisabledSelect} // handle error
            shouldHighlightWeekends
          />
        </ConfigProvider>
      </div>
    </CalendarBlock>
  );
};

export default DataBooking;
