import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table/interface';

interface PalmDetails {
  palmid: number;
  quality: string;
  real: string;
  predicted: string;
  x1_coordinate: string;
  y1_coordinate: string;
  x2_coordinate: string;
  y2_coordinate: string;
  palm_image_uploaded: string;
  imageid: number;
}

interface PalmDetailsTableProps {
  palmdetails: PalmDetails[];
}

const PalmDetailsTable: React.FC<PalmDetailsTableProps> = ({ palmdetails }) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
  });

  const [realSearch, setRealSearch] = useState<string>('');

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: 'Palm ID',
      dataIndex: 'palmid',
      key: 'palmid',
    },
    {
      title: 'Quality',
      dataIndex: 'quality',
      key: 'quality',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search quality"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
          />
        </div>
      ),
      onFilter: (value: any, record: PalmDetails) => record.quality.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Real/Predicted',
      dataIndex: 'real',
      key: 'real',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Real/Predicted"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => {
              confirm();
              setRealSearch(selectedKeys[0] || '');
            }}
          />
        </div>
      ),
      onFilter: (value: any, record: PalmDetails) => record.real.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'X1 Coordinate',
      dataIndex: 'x1_coordinate',
      key: 'x1_coordinate',
    },
    {
      title: 'Y1 Coordinate',
      dataIndex: 'y1_coordinate',
      key: 'y1_coordinate',
    },
    {
      title: 'X2 Coordinate',
      dataIndex: 'x2_coordinate',
      key: 'x2_coordinate',
    },
    {
      title: 'Y2 Coordinate',
      dataIndex: 'y2_coordinate',
      key: 'y2_coordinate',
    },
  ];

  const filteredData = palmdetails.filter((record:any) =>
    Object.keys(record).some((key) =>
      record[key].toString().toLowerCase().includes(realSearch.toLowerCase())
    )
  );

  const tableTitleStyle = { color: '#ff6929', fontSize: '24px', fontWeight: 'bold' };

  return (
    <Table
      dataSource={filteredData}
      columns={columns}
      pagination={pagination}
      onChange={handleTableChange}
      title={() => <div style={tableTitleStyle}>Palm Details</div>}
    />
  );
};

export default PalmDetailsTable;
