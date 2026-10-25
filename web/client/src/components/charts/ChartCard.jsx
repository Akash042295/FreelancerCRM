import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler
);

const chartComponents = {
  bar: Bar,
  line: Line,
  doughnut: Doughnut,
};

const ChartCard = ({ title, subtitle, type = 'bar', data, options = {}, className = '' }) => {
  const ChartComponent = chartComponents[type];

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: type === 'doughnut',
        position: 'bottom',
        labels: { color: '#A3A3A3', padding: 15, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: '#1A1A1A',
        titleColor: '#FFFFFF',
        bodyColor: '#A3A3A3',
        borderColor: '#2A2A2A',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: { color: '#1A1A1A', drawBorder: false },
        ticks: { color: '#6B7280', font: { size: 11 } },
      },
      y: {
        grid: { color: '#1A1A1A', drawBorder: false },
        ticks: { color: '#6B7280', font: { size: 11 } },
      },
    } : undefined,
    ...options,
  };

  return (
    <div className={`bg-[#1A1A1A]/80 backdrop-blur-xl border border-black/50 rounded-xl p-5 ${className}`}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-64">
        {ChartComponent && <ChartComponent data={data} options={defaultOptions} />}
      </div>
    </div>
  );
};

export default ChartCard;
