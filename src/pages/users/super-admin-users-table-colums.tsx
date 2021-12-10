import React from 'react';
import ActionButton from 'components/ActionButton';
import { StyledName } from './styles';

const superAdminTableColumns: any[] = [{
  title: 'Name',
  width: '50%',
  key: 'name',
  sorter: (a: any, b: any) => a.first_name.length - b.first_name.length,
  sortDirections: ['descend', 'ascend'],

  render: (record: any) => (
    <>
      <StyledName style={record.is_blocked ? { color: 'grey' } : { color: 'black' }}>{record.first_name}</StyledName>
      <StyledName style={record.is_blocked ? { color: 'grey' } : { color: 'black' }}>{record.last_name}</StyledName>
    </>
  ),
},
{
  title: 'Actions',
  width: '25%',
  render: (record: any, action: any) => (
    <ActionButton style={record.is_blocked ? { color: 'grey' } : { color: 'black' }} type="text" size="middle" onClick={action}>Edit</ActionButton>
  ),
},
{
  title: '',
  width: '25%',
  dataIndex: 'is_blocked',
  render: (is_blocked: boolean) => (
    // eslint-disable-next-line no-console
    <ActionButton type="text" style={is_blocked ? { color: 'grey' } : { color: 'black' }} size="middle" onClick={() => console.log(is_blocked)}>{is_blocked ? 'Block' : 'Unblock' }</ActionButton>
  ),
},
];

export default superAdminTableColumns;
