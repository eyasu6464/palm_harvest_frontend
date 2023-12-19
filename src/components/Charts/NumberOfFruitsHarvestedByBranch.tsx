import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { Bar } from 'react-chartjs-2';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';
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

const NumberOfFruitsHarvestedByBranch = () => {
  const userAccessKey = getCookie('userAccessKey');
  const [palmListData, setPalmListData] = useState({
    labels: [],
    data: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchPalmListData = async () => {
    try {
      setLoading(true);
      // Assuming URL and userAccessKey are defined somewhere in your code
      const response = await axios.get(`${URL}getpalmssummarybybranch/`, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      setPalmListData({
        labels: response.data.labels,
        data: response.data.data,
      });
    } catch (error) {
      console.error('Error fetching palm list data:', error);
      // Handle error and show notification
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPalmListData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Images Uploaded by Branch',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Images',
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

  const imageData = {
    labels: palmListData.labels,
    datasets: [
      {
        label: 'Number of Fruits Harvested',
        data: palmListData.data,
        borderColor: 'rgb(255, 105, 41)',
        backgroundColor: 'rgba(255, 105, 41, 0.5)',
      },
    ],
  };

  return (
    <div className='w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
      <p style={{ color: '#ff6929' }} className='font-semibold'>
        Number of fruits harvested by Branch
      </p>
      {loading ? (
        <Spin/>
      ) : (
        <Bar options={options} data={imageData} />
      )}
    </div>
  );
};

export default NumberOfFruitsHarvestedByBranch;
