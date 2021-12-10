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
const token = {
  token: '',
};

const UsersPage: FunctionComponent = () => {
  const [users, setUsers] = useState < any[]>([]);

  useEffect(() => {
    getUserList(token).then((data) => {
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
            <StyledTable
              bordered
              rowKey={(record: any): any => record.user_id}
              dataSource={users}
              columns={superAdminTableColumns}
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
