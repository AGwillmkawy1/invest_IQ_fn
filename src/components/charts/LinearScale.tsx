import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  blue: "rgb(54, 162, 235)",
  green: "rgb(75, 192, 192)",
};

const startupLocationData = [
  { location: "Kigali", startups: [10, 35, 40, 55, 50, 35, 74] },
  { location: "Nairobi", startups: [5, 15, 35, 20, 25, 45, 65] },
  { location: "Lagos", startups: [2, 5, 8, 12, 18, 22, 28] },
];

const intervals = [
  "Pre series A",
  "Seed fund",
  "Seed funding",
  "Seed round",
  "Series A",
  "Series B",
  "Series C",
];

const prepareLineChartData = (data) => {
  return {
    labels: intervals,
    datasets: data.map((item, index) => ({
      label: item.location,
      data: item.startups,
      borderColor:
        Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length],
      backgroundColor:
        Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length],
    })),
  };
};

const LineChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const data = prepareLineChartData(startupLocationData);
    setChartData(data);
  }, []);

  const config = {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Growth of Startups in Different Locations Over Time",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 50,
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={config.options} />
    </div>
  );
};

export default LineChartComponent;
