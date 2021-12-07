import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import ActionButton from 'components/ActionButton';
import { ADD_USER_BUTTON_TEXT } from 'utils/texts-constants';
import { mockUserPageTableColumns } from 'utils/mocks/mock-user-page-table-data';
import UserMenu from 'components/userMenu';
import { IUser } from 'utils/types';
import {
  StyledMain, ButtonWrap, ContentWrap, StyledTable, FlexContainer, StyleDiv,
} from './styles';

const user: IUser = {
  _id: 'qwe',
  name: 'string',
  role: 'superAdmin',
};
axios.defaults.baseURL = 'http://localhost:3004';

const UsersPage: FunctionComponent = () => {
  const [users, setUsers] = useState < any[]>([]);
  // eslint-disable-next-line no-console
  console.log(users);
  useEffect(() => {
    // if (users.length === 0) {
    //   return;
    // }
    axios.get('/user').then((res) => {
      // eslint-disable-next-line no-console
      console.log(res.data);
      setUsers(res.data);
    });
    // return () => {
    // }
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
            <StyledTable
              bordered
              rowKey={(record: any) => record.key}
              dataSource={users}
              columns={mockUserPageTableColumns}
              pagination={{
                hideOnSinglePage: true,
              }}
            />
          </ContentWrap>
        </StyleDiv>
      </FlexContainer>
    </StyledMain>
  );
};

export default UsersPage;
