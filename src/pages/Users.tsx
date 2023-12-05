import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Dropdown, Menu, Input, Modal, notification, Badge  } from 'antd';
import { DownOutlined, MoreOutlined, EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import { URL } from '../redux/ActionTypes';
import { getCookie } from 'typescript-cookie'
import RegisterHarvesterModal from '../components/RegisterHarvesterModal';
import InactiveUsersTable from '../components/tables/InactiveUsersTable';
import { useSelector, useDispatch } from 'react-redux';
import { add_user_list } from '../redux/Actions';

interface User {
  id: number;
  fullName: string;
  email: string;
}

interface Props {
  data: User[];
}

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
  branch: number;
  user_type: string;
  address: string;
}

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | undefined>();
  const [data, setData] = useState<any[]>([])
  const dispatch = useDispatch()
  const userList:UserData[] = useSelector((state:any) => state.userList);
  const activeUsers:UserData[] = userList.filter((user:any) => user.palmuser.is_active)
  const inactiveUsers:UserData[] = userList.filter((user) => !user.palmuser.is_active);
  const userAccessKey = getCookie('userAccessKey')
  async function getUsers(){
    try{
      const response = await axios.get( URL + 'users', {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      })
      setData(response.data)
      dispatch(add_user_list(response.data))
    }
    catch(error){
      console.log(error)
    }
  }
  async function deactivateAccount(id:any){
    try{
      const response = await axios.get(URL + `deactivateaccount/${id}/`,{
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });
      console.log(response.data);
      getUsers();
      notification.success({
        message: 'Account Deactivated Successfully',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
    catch(error){
      console.log(error)
      notification.error({
        message: 'Please Try again!',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const extractedData = activeUsers.map(item => ({
    id: item.palmuser.id,
    fullName: item.palmuser.first_name + " " + item.palmuser.last_name,
    email: item.palmuser.email,
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
          <button
            type="button"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 90 }}
          >
            Search
          </button>
          <button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>
            Reset
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <DownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: User, b: User) => a.id - b.id,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
      sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: User) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit">
                  <div className='flex flex-row'>
                    <EditOutlined />
                    <p className='ml-2'>Edit</p>
                  </div>
                </Menu.Item>
                <Menu.Item key="deactivate" onClick={()=>{ deactivateAccount(record.id) }}>
                  <div className='flex flex-row'>
                    <CloseOutlined />
                    <p className='ml-2'>Deactivate</p>
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

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div className='m-8'>
      <Table
        dataSource={extractedData}
        columns={columns}
        onChange={(pagination, filters, sorter) => console.log(pagination, filters, sorter)}
        scroll={{ x: true}}
        pagination={paginationConfig}
        title={() => 
          <div>
            <Badge count={extractedData.length} style={{ backgroundColor: '#52c41a', marginLeft: '8px' }}>
              <p className='font-bold text-lg text-green-600'>Active Users List</p>
            </Badge>
          </div>
        }
      />
      <InactiveUsersTable inactiveUsers={inactiveUsers} getUsers={getUsers}/>
    </div>
  );
};

export default Users;
