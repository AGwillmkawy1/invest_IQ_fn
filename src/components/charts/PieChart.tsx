import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CHART_COLORS = {
  Red: "rgb(255, 99, 132)",
  Orange: "rgb(255, 159, 64)",
  Yellow: "rgb(255, 205, 86)",
  Green: "rgb(75, 192, 192)",
  Blue: "rgb(54, 162, 235)",
};

const getTopSectors = (data: any, limit: any) => {
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  return sortedData.slice(0, limit);
};

const prepareChartData = (data: any) => {
  const labels = data.map((item: any) => item.businessType);
  const amounts = data.map((item: any) => item.amount);
  return {
    labels: labels,
    datasets: [
      {
        label: "Investment Amount",
        data: amounts,
        backgroundColor: Object.values(CHART_COLORS).slice(0, data.length),
      },
    ],
  };
};

export default function PieChart({ investmentData }: { investmentData: any }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const topSectors = getTopSectors(investmentData, 5);
    const data = prepareChartData(topSectors);
    setChartData(data);
  }, []);

  const config = {
    type: "pie",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Top 5 Investment Sectors",
        },
      },
    },
  };

  return (
    <div className="w-1/2 bg-white rounded-2xl">
      <Pie data={chartData} options={config.options} />
    </div>
  );
}
