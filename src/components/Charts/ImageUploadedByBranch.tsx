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

// Replace the following data with your actual data
const branchLabels = ['Branch A', 'Branch B', 'Branch C'];
const imageCounts = [30, 45, 20];

export const imageData = {
  labels: branchLabels,
  datasets: [
    {
      label: 'Number of Images Uploaded',
      data: imageCounts,
      borderColor: 'rgb(255, 105, 41)',
      backgroundColor: 'rgba(255, 105, 41, 0.5)',
    },
  ],
};

const ImageUploadedByBranch = () => {
  return (
    <div className='w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
        <p style={{color:"#ff6929"}} className='font-semibold'>Images Uploaded By Branch</p>
        <Bar options={options} data={imageData} />
    </div>
  );
};

export default ImageUploadedByBranch;
