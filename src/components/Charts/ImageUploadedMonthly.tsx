import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Select, Spin } from 'antd';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';
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

interface PalmListResponse {
  year: number;
  labels: string[];
  data: number[];
}

const { Option } = Select;

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

const ImageUploadedMonthly: React.FC = () => {
  const userAccessKey = getCookie('userAccessKey');
  const [loading, setLoading] = useState<boolean>(false);
  const [palmListData, setPalmListData] = useState<PalmListResponse[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<PalmListResponse[]>(`${URL}allyearmonthswithimagecount/`, {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });
        setPalmListData(response.data);
        // Set the default selected year to the latest year
        if (response.data.length > 0) {
          setSelectedYear(response.data[response.data.length - 1].year);
        }
      } catch (error) {
        console.error('Error fetching palm list data:', error);
        // Handle error and show notification to the user
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
  };

  const getChartDataForSelectedYear = () => {
    const selectedYearData = palmListData.find((data) => data.year === selectedYear);
    return selectedYearData || { labels: [], data: [] };
  };

  return (
    <div className='w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
      <p style={{ color: '#ff6929' }} className='font-semibold'>
        Monthly Fruits Harvested
      </p>
      {loading ? (
        <Spin />
      ) : palmListData.length > 0 ? (
        <>
          <Select
            style={{ width: '100%' }}
            placeholder='Select a year'
            onChange={handleYearChange}
            value={selectedYear}
          >
            {palmListData.map((data) => (
              <Option key={data.year} value={data.year}>
                {data.year}
              </Option>
            ))}
          </Select>
          <Line
            options={options}
            data={{
              labels: getChartDataForSelectedYear().labels as string[], // Explicit type assertion
              datasets: [
                {
                  label: 'Fruits Harvested',
                  data: getChartDataForSelectedYear().data,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
          />
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ImageUploadedMonthly;