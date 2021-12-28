import React, { FC, useState } from 'react';
import { Select, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import CalendarSelect from 'components/DatePicker/DisDaysLogic';
import {
  SubmitButton, CalendarBlock, SelectBlock, HeaderBlock,
} from './styled';
// const { RangePicker } = DatePicker;
const { Option } = Select;

const DataBooking: FC = () => {
  const [type, setType] = useState<string>('vacation');
  const [date, setDate] = useState<[ string, string ]>(['', '']);

  const onChangeRestType = (value: any) => setType(value);
  const handlerChange = (data:[ string, string ]):void => {
    setDate(data);
  };
  const onSubmit = () => {
    console.log('add submit:', type, date);
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
        <SubmitButton htmlType="submit" type="primary" size="large" onClick={() => onSubmit()}>
          Submit
        </SubmitButton>
      </HeaderBlock>
      <div>
        <ConfigProvider>
          <CalendarSelect type={type} onChangeDay={handlerChange} />
        </ConfigProvider>
      </div>
    </CalendarBlock>
  );
};

export default DataBooking;
