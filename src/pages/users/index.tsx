import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Popconfirm } from 'antd';
import API from 'services/api/userApi';
import toggleUserBlock from 'services/api/toggleUserBlock';
import getUserList from 'services/api/userlistApi';
import deleteById from 'services/api/deleteById';
import ActionButton from 'components/ActionButton';
import UserMenu from 'components/userMenu';
import LANG from 'language/en';
import ModalAddUser from 'components/AddUserForm';
import { store } from 'store';
import { ICreateUser } from 'services/reducers/user/api.types';
import { ADD_USER_BUTTON_TEXT, SUPER_ADMIN_ROLE } from 'utils/texts-constants';
import {
  StyledPage,
  StyledMain,
  ButtonWrap,
  ContentWrap,
  StyledTable,
  StyledActionButton,
  StyledName,
  WrapperSet,
  StyledFilter,
} from './styles';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  is_blocked: boolean;
  user_id: number;
}

const UsersPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userRole = store.getState().user.userData.role;
  const navigate = useNavigate();
  const token = {
    token: store.getState().user.token,
  };

  useEffect(() => {
    getUserList(token).then((data) => {
      if (data.length === 0) {
        return;
      }
      setUsers(data);
      setFilteredUsers(data);
      // eslint-disable-next-line no-console
    }).catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getUserList(token).then((data) => {
      if (data.length === 0) {
        return;
      }
      setUsers(data);
      // eslint-disable-next-line no-console
    }).catch((error) => console.log(error));
  }, [isModalOpen]);

  useEffect(() => {
    const findUsers = filteredUsers.filter(
      (user: User) => user.last_name.toLocaleLowerCase().includes(filter.toLowerCase()),
    );
    setUsers(findUsers);
  }, [filter, filteredUsers]);

  const toggleModal = ():void => {
    setIsModalOpen(!isModalOpen);
  };

  const onFinish = async (values:ICreateUser):Promise<any> => {
    const result = await API.addNewUser(values);
    toggleModal();
    return result;
  };

  const toggleBlock = (isBlock: boolean, id: number): void => {
    const findUser = users.map((user: User): any => {
      if (user.user_id === id) {
        const toggle = user.is_blocked ? 0 : 1;
        const isBlockUser = { ...user, ...{ is_blocked: toggle } };
        return isBlockUser;
      }
      return user;
    });
    setUsers(findUser);
    toggleUserBlock(id, token.token);
  };

  const handleDelete = (id: number) => {
    const findUser = users.filter((user: User) => user.user_id !== id);
    setUsers(findUser);
    deleteById(id, token.token);
  };

  const superAdminTableColumns: ColumnsType<any> = [{
    title: 'Name',
    width: '50%',
    key: 'name',
    sorter: (a: User, b: User): number => a.first_name.length - b.first_name.length,
    sortDirections: ['descend', 'ascend'],

    render: ({ is_blocked, first_name, last_name }) => (
      <>
        <StyledName color={is_blocked}>{first_name}</StyledName>
        <StyledName color={is_blocked}>{last_name}</StyledName>
      </>
    ),
  },
  {
    title: 'Actions',
    width: '25%',
    render: (record) => (
      <StyledActionButton color={record.is_blocked} type="text" size="middle" onClick={() => navigate('/userpage', { state: record })}>Edit</StyledActionButton>
    ),
  },
  {
    title: '',
    width: '25%',
    render: (record) => (
      <>
        {userRole === SUPER_ADMIN_ROLE
          ? <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.user_id)}><StyledActionButton type="text" size="middle" color={record.is_blocked}>Delete</StyledActionButton></Popconfirm>
          : <StyledActionButton type="text" size="middle" color={record.is_blocked} onClick={() => toggleBlock(record.is_blocked, record.user_id)}>{record.is_blocked ? 'Block' : 'Unblock'}</StyledActionButton>}
      </>
    ),
  },
  ];
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const currentData = evt.currentTarget.value;
    setFilter(currentData);
  };

  return (
    <StyledPage>
      <UserMenu />
      <StyledMain>
        <WrapperSet>
          <StyledFilter
            type="text"
            value={filter}
            name="filter"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            placeholder={LANG.searchUser}
            onChange={onChange}
          />
          <ButtonWrap>
            <ActionButton
              block
              type="default"
              shape="round"
              size="large"
              onClick={() => toggleModal()}
            >
              {ADD_USER_BUTTON_TEXT}
            </ActionButton>
            <ModalAddUser
              isModalOpen={isModalOpen}
              onFinish={onFinish}
              toggleModal={toggleModal}
            />
          </ButtonWrap>
        </WrapperSet>
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
      </StyledMain>
    </StyledPage>
  );
};

export default UsersPage;
