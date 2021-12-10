import React from 'react';
import ActionButton from 'components/ActionButton';

function toggle(isBlocked: boolean) {
  if (isBlocked) {
    /* eslint-disable no-console */
    console.log(!isBlocked);
    return;
  }
  /* eslint-disable no-console */
  console.log(isBlocked);
}
/* eslint-disable no-console */
export const mockUserPageTableColumns: any[] = [
  {
    title: 'Name',
    width: '50%',
    dataIndex: 'first_name',
    key: 'name',
    sorter: (a: any, b: any) => a.first_name.length - b.first_name.length,
    sortDirections: ['descend', 'ascend'],
    render: (first_name: any) => (
      <span>
        {first_name}
      </span>
    ),
  },
  {
    title: 'Actions',
    width: '25%',
    dataIndex: 'manageDaysOffAction',
    render: (action: any) => (
      <ActionButton type="text" size="middle" onClick={action}>Edit</ActionButton>
    ),
  },
  // {
  //   title: '',
  //   width: '25%',
  //   dataIndex: 'manageUserAction',
  //   render: (action: any) => (
  //     <ActionButton type="text" size="middle" onClick={action}>Block</ActionButton>
  //   ),
  // },
  {
    title: '',
    width: '25%',
    dataIndex: 'is_blocked',
    render: (is_blocked: boolean) => (
      <ActionButton type="text" style={is_blocked ? { backgroundColor: 'grey' } : { backgroundColor: 'red' }} size="middle" onClick={() => toggle(is_blocked)}>{is_blocked ? 'Block' : 'Unblock' }</ActionButton>
    ),
  },
];

export const mockUserPageTableData: any[] = [
  {
    key: '1',
    name: 'Mock User 1',
    manageDaysOffAction: () => console.log('manageDaysOffAction Button pressed'),
    manageUserAction: () => console.log('manageUserAction Button pressed'),
  },
  {
    key: '2',
    name: 'User 2',
    manageDaysOffAction: () => console.log('manageDaysOffAction Button pressed'),
    manageUserAction: () => console.log('manageUserAction Button pressed'),
  },
  {
    key: '3',
    name: 'Another Mock User 3',
    manageDaysOffAction: () => console.log('manageDaysOffAction Button pressed'),
    manageUserAction: () => console.log('manageUserAction Button pressed'),
  },
];
