import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

// Replace the following data with your actual data
const branchLabels = ['Branch A', 'Branch B', 'Branch C'];
const harvesterCounts = [15, 20, 10];

export const harvesterData = {
  labels: branchLabels,
  datasets: [
    {
      label: 'Number of Harvesters',
      data: harvesterCounts,
      borderColor: 'rgb(255, 105, 41)',
      backgroundColor: 'rgba(255, 105, 41, 0.5)',
    },
  ],
};

const BranchVSHarvesterRelation = () => {
  return (
    <div className='w-96 shadow-md m-2 p-4'>
        <p style={{color:"#ff6929"}} className='font-semibold'>Number Of Harvesters In Branches</p>
      <Bar options={options} data={harvesterData} />
    </div>
  );
};

export default BranchVSHarvesterRelation;
