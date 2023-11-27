import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Dropdown, Menu, Input } from 'antd';
import { DownOutlined, MoreOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';

interface UserData {
  userid: number;
  username: string;
  firstname: string;
  lastname: string;
}

const InactiveUsersTable: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | undefined>();

  useEffect(() => {
    async function getUsers(userAccessKey: any) {
      try {
        const response = await axios.get(URL + 'inactiveusers/', {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers(getCookie('userAccessKey'));
  }, []);

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
      title: 'User ID',
      dataIndex: 'userid',
      key: 'userid',
      sorter: (a: UserData, b: UserData) => a.userid - b.userid,
    },
    {
      title: 'Full Name',
      dataIndex: 'firstname',
      key: 'fullname',
      ...getColumnSearchProps('fullname'),
      sorter: (a: UserData, b: UserData) => (a.firstname + ' ' + a.lastname).localeCompare(b.firstname + ' ' + b.lastname),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
      sorter: (a: UserData, b: UserData) => a.username.localeCompare(b.username),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: UserData) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit">
                  <div className="flex flex-row">
                    <EditOutlined />
                    <p className="ml-2">Edit</p>
                  </div>
                </Menu.Item>
                <Menu.Item key="deactivate">
                  <div className="flex flex-row">
                    <CloseOutlined />
                    <p className="ml-2">Activate</p>
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

  return (
    <div className="m-8">
      <Table
        dataSource={data}
        columns={columns}
        onChange={(pagination, filters, sorter) => console.log(pagination, filters, sorter)}
        scroll={{ x: true }}
        title={() => <p className=' font-bold text-lg text-gray-600 '>Inactive Users List</p>}
      />
    </div>
  );
};

export default InactiveUsersTable;
