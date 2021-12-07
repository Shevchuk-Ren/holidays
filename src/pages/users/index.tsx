import React, { FC } from 'react';
import ActionButton from 'components/ActionButton';
import { ADD_USER_BUTTON_TEXT } from 'utils/texts-constants';
import { mockUserPageTableColumns, mockUserPageTableData } from 'utils/mocks/mock-user-page-table-data';
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

const UsersPage: FC = () => (
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
            dataSource={mockUserPageTableData}
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

export default UsersPage;
