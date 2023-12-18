import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const data = {
  labels,
  datasets: [
    {
      label: 'Fruits Harvested',
      data: [50, 560, 27, 275, 14, 335, 80], // Replace with your sample data
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const ImageUploadedMonthly: React.FC = () => {
  return(
  <div className='w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
    <p style={{color:"#ff6929"}} className='font-semibold'>Monthly Fruits Harvested</p>
    <Line options={options} data={data} />
  </div>
  )
};

export default ImageUploadedMonthly;
