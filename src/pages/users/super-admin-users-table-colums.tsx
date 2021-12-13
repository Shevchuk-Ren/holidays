import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { StyledActionButton, StyledName } from './styles';

const store = true;
type UserValues = {
  first_name: string;
  last_name: string;
  is_blocked: any;
};
interface User {
  first_name: string;
  last_name: string;
  is_blocked: boolean;
  user_id: number;
}
// interface UserColums {
//   key?: string;
//   width?: string;
//   name?: string;
//   sortDirections?: any;
//   dataIndex?: string | undefined;
//   title?: string;
//   first_name?: string;
//   last_name?: string;
//   is_blocked?: boolean;
//   user_id?: number;
// }

const superAdminTableColumns: ColumnsType<any> = [{
  title: 'Name',
  width: '50%',
  key: 'name',
  sorter: (a: User, b: User): number => a.first_name.length - b.first_name.length,
  sortDirections: ['descend', 'ascend'],

  render: ({ is_blocked, first_name, last_name }: UserValues) => (
    <>
      <StyledName color={is_blocked}>{first_name}</StyledName>
      <StyledName color={is_blocked}>{last_name}</StyledName>
    </>
  ),
},
{
  title: 'Actions',
  width: '25%',
  render: ({ is_blocked }) => (
    <StyledActionButton color={is_blocked} type="text" size="middle">Edit</StyledActionButton>
  ),
},
{
  title: '',
  width: '25%',
  dataIndex: 'is_blocked',
  render: (is_blocked) => (
    <>
      {store ? <StyledActionButton type="text" size="middle" color={is_blocked}>Delete</StyledActionButton> : <StyledActionButton type="text" size="middle" color={is_blocked}>{is_blocked ? 'Block' : 'Unblock'}</StyledActionButton>}
    </>
  ),
},
];

export default superAdminTableColumns;
