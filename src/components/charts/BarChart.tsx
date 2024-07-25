import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const getTopLocations = (data, limit) => {
  const locationCount = data.reduce((acc, item) => {
    if (!acc[item.location]) {
      acc[item.location] = 0;
    }
    acc[item.location] += item.startup_names.length;
    return acc;
  }, {});

  const sortedLocations = Object.entries(locationCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);

  return sortedLocations.map(([location, count]) => ({ location, count }));
};

const prepareChartData = (data) => {
  const labels = data.map((item) => item.location);
  const counts = data.map((item) => item.count);
  return {
    labels: labels,
    datasets: [
      {
        label: "Number of Startups",
        data: counts,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };
};

export default function BarChart({ startupData }: { startupData: any }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const topLocations = getTopLocations(startupData, 5);
    const data = prepareChartData(topLocations);
    setChartData(data);
  }, []);

  const configVerticalBarChart = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 Locations with Most Startups",
      },
    },
  };

  return <Bar data={chartData} options={configVerticalBarChart} />;
}
