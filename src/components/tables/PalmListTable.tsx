import React, { useEffect, useState } from 'react';
import { Table, Tag, Input, Button, Select, notification } from 'antd';
import axios from 'axios';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';

const { Option } = Select;

interface PalmListData {
  imageId: number;
  imageCreated: string;
  imageUploaded: string;
  harvesterName: string;
  branchName: string;
  numberOfFruits: number;
  unRipe: number;
  ripe: number;
  overRipe: number;
  real:number;
  predicted:number;
}

const PalmListTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [palmListData, setPalmListData] = useState<PalmListData[]>([]);
  const userAccessKey = getCookie('userAccessKey');
  const uniqueBranchNames = Array.from(new Set(palmListData.map(item => item.branchName)));
  const uniqueHarvesterNames = Array.from(new Set(palmListData.map((item) => item.harvesterName)));

    useEffect(() => {
      const fetchPalmListData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${URL}getpalmlist/`, {
            headers: {
              Authorization: `Bearer ${userAccessKey}`,
              'Content-Type': 'application/json',
            },
          });
          setPalmListData(response.data);
        } catch (error:any) {
          console.error('Error fetching palm list data:', error);
          notification.error({
            message: error.response?.data?.message || 'Error fetching data',
            description: error.message || 'Unknown error',
            duration: 5,
          });
        } finally {
          setLoading(false);
        }
      };
  
      fetchPalmListData();
    }, []);

  const columns = [
    {
      title: 'Image ID',
      dataIndex: 'imageId',
      key: 'imageId',
      sorter: (a: any, b: any) => a.imageId - b.imageId,
    },
    {
        title: 'Image Created',
        dataIndex: 'imageCreated',
        key: 'imageCreated',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Input
              type="date"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8, backgroundColor: '#ff6929', borderColor: '#ff6929' }}
            >
              Filter
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        onFilter: (value: any, record: any) =>
          record.imageCreated.includes(value),
      },
      {
        title: 'Image Uploaded',
        dataIndex: 'imageUploaded',
        key: 'imageUploaded',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Input
              type="date"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8, backgroundColor: '#ff6929', borderColor: '#ff6929' }}
            >
              Filter
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        onFilter: (value: any, record: any) =>
          record.imageUploaded.includes(value),
      },
      {
        title: 'Harvester Name',
        dataIndex: 'harvesterName',
        key: 'harvesterName',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Select
              showSearch
              placeholder="Search harvester name"
              value={selectedKeys[0]}
              onChange={(value) => setSelectedKeys(value ? [value] : [])}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            >
              {uniqueHarvesterNames.map((harvesterName) => (
                <Option key={harvesterName} value={harvesterName}>
                  {harvesterName}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8, backgroundColor: '#ff6929', borderColor: '#ff6929' }}
            >
              Filter
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        onFilter: (value: any, record: any) =>
          record.harvesterName.toLowerCase().includes(value.toLowerCase()),
      },
      {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            showSearch
            placeholder="Search branch name"
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            filterOption={(input, option:any) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          >
            {uniqueBranchNames.map((branchName) => (
              <Option key={branchName} value={branchName}>
                {branchName}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8, backgroundColor: '#ff6929', borderColor: '#ff6929' }}
          >
            Filter
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value: any, record: any) =>
        record.branchName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Number of Fruits',
      dataIndex: 'numberOfFruits',
      key: 'numberOfFruits',
      sorter: (a: any, b: any) => a.numberOfFruits - b.numberOfFruits,
      render: (numberOfFruits: number) => (
        <Tag color="green">{`Total: ${numberOfFruits}`}</Tag>
      ),
    },
    {
      title: 'Unripe',
      dataIndex: 'unRipe',
      key: 'unRipe',
      render: (unripe: number) => (
        <Tag color="blue">{`Unripe: ${unripe}`}</Tag>
      ),
    },
    {
      title: 'Ripe',
      dataIndex: 'ripe',
      key: 'ripe',
      render: (ripe: number) => (
        <Tag color="green">{`Ripe: ${ripe}`}</Tag>
      ),
    },
    {
      title: 'Over Ripe',
      dataIndex: 'overRipe',
      key: 'overRipe',
      render: (overRipe: number) => (
        <Tag color="red">{`Over Ripe: ${overRipe}`}</Tag>
      ),
    },
    {
        title: 'Real',
        dataIndex: 'real',
        key: 'real',
        render: (real: number) => (
        <Tag color='blue'>{real}</Tag>
        ),
    },
    {
        title: 'Predicted',
        dataIndex: 'predicted',
        key: 'predicted',
        render: (predicted: number) => (
        <Tag color='green'>{predicted}</Tag>
        ),
    },
  ];

  const paginationConfig = {
    pageSize: 5,
  };

  return (
    <div className="">
      <Table
        dataSource={palmListData}
        columns={columns}
        onChange={(pagination, filters, sorter) => console.log(pagination, filters, sorter)}
        scroll={{ x: true }}
        pagination={paginationConfig}
        title={() => (
          <div>
            <p className='font-bold text-lg' style={{color:"#ff6929"}}>Palm List Table</p>
          </div>
        )}
      />
    </div>
  );
};

export default PalmListTable;
