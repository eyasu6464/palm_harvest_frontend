import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Dropdown, Menu, Input, Modal } from 'antd';
import { DownOutlined, MoreOutlined, EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import { URL } from '../redux/ActionTypes';
import { getCookie } from 'typescript-cookie'
import RegisterHarvesterModal from '../components/RegisterHarvesterModal';


interface User {
  id: number;
  fullName: string;
  email: string;
}

interface Props {
  data: User[];
}

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | undefined>();
  const [data, setData] = useState<any[]>([])
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const extractedData = data.map(item => ({
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
                <Menu.Item key="deactivate">
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

  useEffect(() => {
    async function getUsers(userAccessKey:any){
      try{
        const response = await axios.get( URL + 'users', {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        })
        setData(response.data)
      }
      catch(error){
        console.log(error)
      }
    }
    getUsers(getCookie("userAccessKey"))
  }, [])
  return (
    <div className='mx-8'>
      <div className='flex justify-center items-center my-4'>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ backgroundColor: '#ff6929', width:'180px', borderColor: '#ff6929' }}>
            Add Harvester
        </Button>
        <Modal title="Harvester Registration" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <RegisterHarvesterModal/>    
        </Modal>
      </div>
      <Table
        dataSource={extractedData}
        columns={columns}
        onChange={(pagination, filters, sorter) => console.log(pagination, filters, sorter)}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default Users;
