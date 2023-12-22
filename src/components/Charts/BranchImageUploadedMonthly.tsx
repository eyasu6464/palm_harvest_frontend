import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Select, Spin } from 'antd';
import axios from 'axios';
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const { Option } = Select;

interface BranchData {
  branchName: string;
  labels: string[];
  data: number[];
}

interface PalmListResponse {
  year: number;
  branches: BranchData[];
}

const BranchImageUploadedMonthly: React.FC = () => {
  const userAccessKey = getCookie('userAccessKey');
  const [loading, setLoading] = useState<boolean>(false);
  const [palmListData, setPalmListData] = useState<PalmListResponse[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
  };

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);

    const selectedYearData = palmListData.filter((item) => item.year === selectedYear);

    if (selectedYearData.length > 0) {
      const allBranchesData = selectedYearData.flatMap((yearData) => yearData.branches);
      const selectedBranchData = allBranchesData.filter(
        (branch) => branch.branchName === value
      )[0];

      console.log(selectedBranchData);

      const newData = {
        labels: selectedBranchData?.labels || [],
        datasets: [
          {
            label: 'Fruits Harvested',
            data: selectedBranchData?.data || [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      setData(newData);
    }
  };

  useEffect(() => {
    const fetchDataForLatestYear = async () => {
      try {
        setLoading(true);
        const response = await axios.get<PalmListResponse[]>(`${URL}branchyearmonthswithimageanddatacount/`, {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });

        setPalmListData(response.data);

        if (response.data.length > 0) {
          const latestYear = response.data[response.data.length - 1].year;
          setSelectedYear(latestYear);

          const latestYearBranchData = response.data
            .find((item) => item.year === latestYear)
            ?.branches[0];

          if (latestYearBranchData) {
            setSelectedBranch(latestYearBranchData.branchName); 
            const newData = {
              labels: latestYearBranchData.labels || [],
              datasets: [
                {
                  label: 'Fruits Harvested',
                  data: latestYearBranchData.data || [],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            };
            setData(newData);
          }
        }
      } catch (error) {
        console.error('Error fetching palm list data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForLatestYear();
  }, []); // empty dependency array to run the effect only once when the component mounts

  return (
    <div className='w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
      <p style={{ color: '#ff6929' }} className='font-semibold'>
        Monthly Branch Fruits Harvested
      </p>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Select style={{ width: '100%', marginBottom: 8, display: 'block' }} value={selectedYear} onChange={handleYearChange}>
            {[...new Set(palmListData.map((yearData) => yearData.year))].map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
          <Select style={{ width: '100%', marginBottom: 8, display: 'block' }} value={selectedBranch} onChange={handleBranchChange}>
            {palmListData.flatMap((item) => item.branches.map((branch) => (
              <Option key={branch.branchName} value={branch.branchName}>
                {branch.branchName}
              </Option>
            )))}
          </Select>
          {data && <Line options={{ responsive: true }} data={data} />}
        </>
      )}
    </div>
  );
};

export default BranchImageUploadedMonthly;
