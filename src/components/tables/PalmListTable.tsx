import React from 'react';
import { Table, Tag, Input, Button, Select } from 'antd';

const { Option } = Select;

const sampleData = [
    {
      imageId: 1,
      imageCreated: '2023-01-01',
      imageUploaded: '2023-01-05',
      branchName: 'Branch A',
      numberOfFruits: 50,
      unripe: 15,
      ripe: 25,
      overRipe: 10,
      real:true,
    },
    {
      imageId: 2,
      imageCreated: '2023-02-01',
      imageUploaded: '2023-02-08',
      branchName: 'Branch B',
      numberOfFruits: 40,
      unripe: 10,
      ripe: 20,
      overRipe: 10,
      real:true,
    },
    {
      imageId: 3,
      imageCreated: '2023-03-01',
      imageUploaded: '2023-03-15',
      branchName: 'Branch C',
      numberOfFruits: 35,
      unripe: 8,
      ripe: 15,
      overRipe: 12,
      real:true,
    },
    {
      imageId: 4,
      imageCreated: '2023-04-01',
      imageUploaded: '2023-04-20',
      branchName: 'Branch D',
      numberOfFruits: 45,
      unripe: 12,
      ripe: 18,
      overRipe: 15,
      real:false,
    },
    {
      imageId: 5,
      imageCreated: '2023-05-01',
      imageUploaded: '2023-05-10',
      branchName: 'Branch E',
      numberOfFruits: 60,
      unripe: 20,
      ripe: 25,
      overRipe: 15,
      real:false,
    },
    {
      imageId: 6,
      imageCreated: '2023-06-01',
      imageUploaded: '2023-06-05',
      branchName: 'Branch F',
      numberOfFruits: 55,
      unripe: 18,
      ripe: 22,
      overRipe: 15,
      real:true,
    },
    {
      imageId: 7,
      imageCreated: '2023-07-01',
      imageUploaded: '2023-07-10',
      branchName: 'Branch G',
      numberOfFruits: 40,
      unripe: 10,
      ripe: 18,
      overRipe: 12,
      real:false,
    },
    {
      imageId: 8,
      imageCreated: '2023-08-01',
      imageUploaded: '2023-08-08',
      branchName: 'Branch H',
      numberOfFruits: 30,
      unripe: 8,
      ripe: 15,
      overRipe: 7,
      real:true,
    },
    {
      imageId: 9,
      imageCreated: '2023-09-01',
      imageUploaded: '2023-09-15',
      branchName: 'Branch I',
      numberOfFruits: 50,
      unripe: 15,
      ripe: 25,
      overRipe: 10,
      real:false,
    },
    {
      imageId: 10,
      imageCreated: '2023-10-01',
      imageUploaded: '2023-10-10',
      branchName: 'Branch J',
      numberOfFruits: 30,
      unripe: 8,
      ripe: 15,
      overRipe: 7,
      real:true,
    },
  ];
    

interface PalmListData {
  imageId: number;
  imageCreated: string;
  imageUploaded: string;
  branchName: string;
  numberOfFruits: number;
  unripe: number;
  ripe: number;
  overRipe: number;
  real:boolean;
}

const PalmListTable: React.FC = () => {
    const extractedData: PalmListData[] = sampleData.map((item) => ({
        imageId: item.imageId,
        imageCreated: item.imageCreated,
        imageUploaded: item.imageUploaded,
        branchName: item.branchName,
        numberOfFruits: item.numberOfFruits,
        unripe: item.unripe,
        ripe: item.ripe,
        overRipe: item.overRipe,
        real: item.real,
      }));

    const uniqueBranchNames = Array.from(new Set(sampleData.map(item => item.branchName)));

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
              style={{ width: 90, marginRight: 8 }}
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
    },
    {
      title: 'Unripe',
      dataIndex: 'unripe',
      key: 'unripe',
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
        title: 'Real/Predicted',
        dataIndex: 'real',
        key: 'real',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Select
              value={selectedKeys[0]}
              onChange={(value) => setSelectedKeys(value ? [value] : [])}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            >
              <Option value="">All</Option>
              <Option value="true">Real</Option>
              <Option value="false">Predicted</Option>
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
          record.real === (value === 'true' ? true : false),
        render: (real: boolean) => (
          <Tag color={real ? 'green' : 'blue'}>{real ? 'Real' : 'Predicted'}</Tag>
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
