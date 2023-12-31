import  { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie'; 
import { Bar } from 'react-chartjs-2';
import { Spin } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BranchVSHarvesterRelation = () => {
  const userAccessKey = getCookie('userAccessKey');
  const [harvesterData, setHarvesterData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Harvesters',
        data: [],
        borderColor: 'rgb(255, 105, 41)',
        backgroundColor: 'rgba(255, 105, 41, 0.5)',
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const fetchHarvesterData = async () => {
    try {
      setLoading(true);
      // Assuming URL and userAccessKey are defined somewhere in your code
      const response = await axios.get(`${URL}getharvesterscountbybranch/`, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      setHarvesterData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Number of Harvesters',
            data: response.data.data,
            borderColor: 'rgb(255, 105, 41)',
            backgroundColor: 'rgba(255, 105, 41, 0.5)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching harvester data:', error);
      // Handle error and show notification
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHarvesterData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Number of Harvesters in Each Branch',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Harvesters',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Branch',
        },
      },
    },
  };

  return (
    <div className='w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
      <p style={{ color: '#ff6929' }} className='font-semibold'>
        Number Of Harvesters In Branches
      </p>
      {loading ? (
        <Spin/>
      ) : (
        <Bar options={options} data={harvesterData} />
      )}
    </div>
  );
};

export default BranchVSHarvesterRelation;
