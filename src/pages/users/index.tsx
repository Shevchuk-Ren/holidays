// eslint-disable-next-line no-console
import React, { FunctionComponent, useEffect, useState } from 'react';
import ActionButton from 'components/ActionButton';
import { ADD_USER_BUTTON_TEXT } from 'utils/texts-constants';
import UserMenu from 'components/userMenu';
import { IUser } from 'utils/types';
import superAdminTableColumns from './super-admin-users-table-colums';
import getUserList from './user-list-api-server';
import {
  StyledMain, ButtonWrap, ContentWrap, StyledTable, FlexContainer, StyleDiv,
} from './styles';

const user: IUser = {
  _id: 'qwe',
  name: 'string',
  role: 'superAdmin',
};
interface User {
  first_name: string;
  last_name: string;
  is_blocked: boolean;
  user_id: number | undefined;
}
const token = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtpd2kiLCJzdWIiOjMsInVzZXJSb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE2MzkzODkwNzYsImV4cCI6MTYzOTM5MjY3Nn0.ud9TLLIJ0lJn-qGx120cIeFNPx1onfZ7GqA8mZ0KnMU',
};

const UsersPage: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  // eslint-disable-next-line no-console
  console.log(users);
  useEffect(() => {
    if (token.token === '') return;
    getUserList(token).then((data) => {
      if (data.length === 0) {
        return;
      }
      setUsers(data);
      // eslint-disable-next-line no-console
    }).catch((error) => console.log(error));
  }, []);

  return (
    <StyledMain>
      <FlexContainer>
        <UserMenu {...user} />
        <StyleDiv>
          <ButtonWrap>
            <ActionButton
              block
              type="default"
              shape="round"
              size="large"
              // eslint-disable-next-line no-console
              onClick={() => console.log('add another user cb')}
            >
              {ADD_USER_BUTTON_TEXT}
            </ActionButton>
          </ButtonWrap>
          <ContentWrap>
            {users.length > 0
              && (
                <StyledTable
                  bordered
                  rowKey={(record: any): number => record.user_id}
                  dataSource={users}
                  columns={superAdminTableColumns}
                  pagination={{
                    hideOnSinglePage: true,
                  }}
                />
              )}
          </ContentWrap>
        </StyleDiv>
      </FlexContainer>
    </StyledMain>
  );
};

export default UsersPage;
