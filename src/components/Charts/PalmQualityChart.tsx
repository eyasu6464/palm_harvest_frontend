import{ useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Spin } from 'antd';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';


ChartJS.register(ArcElement, Tooltip, Legend);

interface PalmListData {
  labels: string[];
  data: number[];
}

const PalmQualityChart = () => {
  const [loading, setLoading] = useState(false);
  const [palmListData, setPalmListData] = useState<PalmListData | null>(null);
  const userAccessKey = getCookie('userAccessKey');
  const fetchPalmListData = async () => {
    try {
      setLoading(true);
      // Assuming URL and userAccessKey are defined somewhere in your code
      const response = await axios.get(`${URL}getpalmdetailssummary/`, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      setPalmListData(response.data);
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

  if(loading){
    return <Spin/>
  }
  const qualityData = {
    labels: palmListData?.labels || [],
    datasets: [
      {
        label: 'Palm Quality',
        data: palmListData?.data || [], // Replace with your actual data
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Palm Quality Distribution',
          font: {
            size: 16,
          },
        },
      },
    };
  
  return (
    <div className='w-64 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
      <p style={{color:"#ff6929"}} className='font-semibold'>Palm Quality Distribution</p>
      <Doughnut data={qualityData} options={chartOptions} />
    </div>
  );
};

export default PalmQualityChart;
