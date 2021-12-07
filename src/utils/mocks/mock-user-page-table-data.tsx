import React from 'react';
import ActionButton from 'components/ActionButton';

/* eslint-disable no-console */
export const mockUserPageTableColumns: any[] = [
  {
    title: 'Name',
    width: '50%',
    dataIndex: 'name',
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
    render: (name: any) => (<span>{name}</span>),
  },
  {
    title: 'Actions',
    width: '25%',
    dataIndex: 'manageDaysOffAction',
    render: (action: any) => (
      <ActionButton type="text" size="middle" onClick={action}>Edit</ActionButton>
    ),
  },
  {
    title: '',
    width: '25%',
    dataIndex: 'manageUserAction',
    render: (action: any) => (
      <ActionButton type="text" size="middle" onClick={action}>Block</ActionButton>
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
