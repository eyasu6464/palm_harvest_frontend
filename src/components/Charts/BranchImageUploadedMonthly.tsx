import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Select } from 'antd';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const { Option } = Select;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Monthly Image Uploads',
    },
  },
};

interface SampleData {
  [key: string]: number[]; // Index signature allowing any string key with number[] value
}

const sampleData: SampleData = {
  branch1: [50, 225, 72, 420, 90, 330, 80],
  branch2: [30, 45, 80, 100, 70, 90, 60],
  branch3: [80, 100, 120, 140, 110, 130, 100],
};

const BranchImageUploadedMonthly: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>('branch1');

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Fruits Harvested',
        data: sampleData[selectedBranch],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
    <p style={{color:"#ff6929"}} className='font-semibold'>Monthly Branch Fruits Harvested</p>
      <Select style={{ width: 200 }} defaultValue={selectedBranch} onChange={handleBranchChange}>
        <Option value="branch1">Branch 1</Option>
        <Option value="branch2">Branch 2</Option>
        <Option value="branch3">Branch 3</Option>
        {/* Add more branches as needed */}
      </Select>
      <Line options={options} data={data} />
    </div>
  );
};

export default BranchImageUploadedMonthly;
