import React, { useState } from 'react';
import { Table, Space, Dropdown, Menu, Input, notification, Badge } from 'antd';
import { DownOutlined, MoreOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';

interface PalmUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

interface UserData {
  palmuser: PalmUser;
  branch: {
    branchid: number;
    branchname: string;
    city: string;
    address_longitude: string;
    address_latitude: string;
  };
  user_type: string;
  address: string;
}

interface InactiveUsersTableProps {
  inactiveUsers: UserData[];
  getUsers: () => Promise<void>;
}

const InactiveUsersTable: React.FC<InactiveUsersTableProps> = ({ inactiveUsers, getUsers }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | undefined>();
  const userAccessKey = getCookie('userAccessKey');

  async function activateAccount(id: any) {
    try {
      const response = await axios.get(URL + `activateaccount/${id}/`, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      getUsers();
      notification.success({
        message: 'Account Activated Successfully',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    } catch (error) {
      console.log(error);
      console.log(searchText);
      console.log(searchedColumn);
      notification.error({
        message: 'Please Try Again!',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
  }

  const extractedData = inactiveUsers.map((item) => ({
    id: item.palmuser.id,
    fullName: item.palmuser.first_name + ' ' + item.palmuser.last_name,
    username: item.palmuser.username,
    branchName: item.branch.branchname,
    userType: item.user_type,
    isActive: item.palmuser.is_active,
  }));

  const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <button type="button" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </button>
          <button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>
            Reset
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <DownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
      sorter: (a: any, b: any) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
      sorter: (a: any, b: any) => a.username.localeCompare(b.username),
    },
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
      ...getColumnSearchProps('branchName'),
    },
    {
      title: 'User Type',
      dataIndex: 'userType',
      key: 'userType',
      ...getColumnSearchProps('userType'),
    },  
    {
      title: 'Status',
      dataIndex: 'palmuser.is_active',
      key: 'palmuser.is_active',
      render: (isActive: boolean) => (
        <Badge status={isActive ? 'success' : 'error'} text={isActive ? 'Active' : 'Inactive'} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit">
                  <div className="flex flex-row">
                    <EditOutlined />
                    <p className='ml-2'>Edit</p>
                  </div>
                </Menu.Item>
                <Menu.Item key="activate" onClick={() => { activateAccount(record.palmuser.id) }}>
                  <div className="flex flex-row">
                    <CloseOutlined />
                    <p className='ml-2'>Activate</p>
                  </div>
                </Menu.Item>
              </Menu>
            }
          >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <MoreOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const paginationConfig = {
    pageSize: 5,
  };

  return (
    <div className="">
      <Table
        dataSource={extractedData}
        columns={columns}
        onChange={(pagination, filters, sorter) => console.log(pagination, filters, sorter)}
        scroll={{ x: true }}
        pagination={paginationConfig}
        title={() => <div>
          <Badge count={extractedData.length} style={{ backgroundColor: 'red', marginLeft: '8px' }}>
            <p className='font-bold text-lg text-red-500'>Inactive Users List</p>
          </Badge>
        </div>}
      />
    </div>
  );
};

export default InactiveUsersTable;
