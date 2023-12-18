import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const qualityData = {
  labels: ['Unripe', 'Ripe', 'Overripe'],
  datasets: [
    {
      label: 'Palm Quality',
      data: [12, 19, 3], // Replace with your actual data
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

const PalmQualityChart = () => {
  return (
    <div className='w-64 drop-shadow-xl m-2 p-4 bg-white rounded-md'>
      <p style={{color:"#ff6929"}} className='font-semibold'>Palm Quality Distribution</p>
      <Doughnut data={qualityData} options={chartOptions} />
    </div>
  );
};

export default PalmQualityChart;
