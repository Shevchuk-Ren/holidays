import React, {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputComponent from 'components/Input';
import ActionButton from 'components/ActionButton';
import DaysCounter from 'components/DaysCounter';
import UserMenu from 'components/userMenu';
import TableComponent from 'components/Table';
import sendUserMail from 'services/api/userPasswordApi';
import getById from 'services/api/getById';
import updateById from 'services/api/updateUser';
import schema from 'components/Input/validation';
import UserData from 'pages/users/users.types';
import { store } from 'store';
import { EMPLOYEE_ROLE } from 'utils/texts-constants';
import {
  StyledPage,
  StyledContent,
  StyledInputWrapper,
  StyledInfoSection,
  StyledButton,
  TableWrapper,
  StyledBtnAddPass,
} from 'pages/userpage/ProfilePage/styles';
import { FormValues } from 'pages/userpage/ProfilePage/usePassword-types';
import DaysBooking from 'components/DatePicker/index';

const ProfilePage: FunctionComponent = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { userData, token } = store.getState().user;
  const location = useLocation().state;
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const currentId = location ? location.user_id : userData.id;

  const defaultValues = {
    firstName: `${userInfo ? userInfo.first_name : ''}`,
    lastName: `${userInfo ? userInfo.last_name : ''}`,
    email: `${userInfo ? userInfo.email : ''}`,
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    getById(currentId, token).then((data) => {
      const userCreated = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      };

      setUserInfo(userCreated);
      // eslint-disable-next-line no-console
    }).catch((error) => console.log(error));
  }, [currentId, token]);

  useEffect(() => {
    if (userInfo) {
      reset(defaultValues);
    }
  }, [userInfo]);

  const onSubmit = (data: FormValues) => {
    const { firstName, lastName, email } = data;
    const userCreated = {
      first_name: firstName,
      last_name: lastName,
      email,
    };
    sendUserMail(userCreated, token);
  };

  const onSubmitSaveUser = (data: FormValues) => {
    const { firstName, lastName, email } = data;
    const userCreated = {
      id: currentId,
      first_name: firstName,
      last_name: lastName,
      email,
    };
    setUserInfo(userCreated);
    updateById(userCreated.id, userCreated, token);
  };

  return (
    <>
      <StyledPage>
        <UserMenu />
        <StyledContent>
          <StyledInfoSection>
            <StyledInputWrapper>

              <InputComponent
                name="firstName"
                control={control}
                rules={{ required: true }}
                error={errors.firstName}
                onText={userInfo ? userInfo.first_name : ''}
              />

              <InputComponent
                name="lastName"
                control={control}
                rules={{ required: true }}
                onText={userInfo ? userInfo.last_name : ''}
                error={errors.lastName}
              />

              {!(userData.role === EMPLOYEE_ROLE) && (

                <>

                  <InputComponent
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    error={errors.email}
                    onText={userInfo ? userInfo.email : ''}
                  />

                  <ActionButton
                    onClick={handleSubmit(onSubmitSaveUser)}
                  >
                    <CheckOutlined />
                  </ActionButton>
                </>
              )}
            </StyledInputWrapper>
            <DaysCounter sickDays={5} vacationDays={15} />
            <StyledButton>
              <ActionButton
                onClick={(): void => {
                  setIsBookingOpen(!isBookingOpen);
                }}
              >
                Add
              </ActionButton>
              { isBookingOpen && <DaysBooking />}
              {!(userData.role === EMPLOYEE_ROLE) && (
                <StyledBtnAddPass
                  onClick={
                    handleSubmit(onSubmit)
                  }
                >
                  send password
                </StyledBtnAddPass>
              )}
            </StyledButton>
          </StyledInfoSection>
          <TableWrapper>
            <TableComponent />
          </TableWrapper>
        </StyledContent>
      </StyledPage>
    </>
  );
};

export default ProfilePage;
