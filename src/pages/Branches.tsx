import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Dropdown, Menu, Input, Modal } from 'antd';
import { DownOutlined, MoreOutlined, EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import { URL } from '../redux/ActionTypes';
import { getCookie } from 'typescript-cookie'
import RegisterBranchModal from '../components/RegisterBranchModal';

interface Branch {
  branchid: number;
  branchname: string;
  city: string;
}

interface Props {
  data: Branch[];
}

const Branches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | undefined>();
  const [data, setData] = useState<Branch[]>([]);
  const userAccessKey = getCookie("userAccessKey")

  async function getBranches() {
    try {
      const response = await axios.get(URL + 'branches', {
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      title: 'Branch ID',
      dataIndex: 'branchid',
      key: 'branchid',
      sorter: (a: Branch, b: Branch) => a.branchid - b.branchid,
    },
    {
      title: 'Branch Name',
      dataIndex: 'branchname',
      key: 'branchname',
      ...getColumnSearchProps('branchname'),
      sorter: (a: Branch, b: Branch) => a.branchname.localeCompare(b.branchname),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      ...getColumnSearchProps('city'),
      sorter: (a: Branch, b: Branch) => a.city.localeCompare(b.city),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Branch) => (
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
                    <p className='ml-2'>Delete</p>
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
    getBranches();
  }, []);

  return (
    <div className='mx-8'>
      <div className='flex justify-center items-center my-4'>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ backgroundColor: '#ff6929', width:'180px', borderColor: '#ff6929' }}>
          Add Branch
        </Button>
        <Modal title="Branch Registration" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <RegisterBranchModal getBranches={getBranches} />
        </Modal>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        onChange={(pagination, filters, sorter) => console.log(pagination, filters, sorter)}
        scroll={{ x: true }}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default Branches;
