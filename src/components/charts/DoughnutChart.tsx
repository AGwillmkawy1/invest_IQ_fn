import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CHART_COLORS = {
  Red: "rgb(255, 99, 132)",
  Orange: "rgb(255, 159, 64)",
  Yellow: "rgb(255, 205, 86)",
  Green: "rgb(75, 192, 192)",
  Blue: "rgb(54, 162, 235)",
  Purple: "rgb(153, 102, 255)",
  Grey: "rgb(201, 203, 207)",
};

const getTopStartups = (data, limit) => {
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  return sortedData.slice(0, limit);
};

const prepareChartData = (data) => {
  const labels = data.map((item) => item.businessName);
  const amounts = data.map((item) => item.amount);
  return {
    labels: labels,
    datasets: [
      {
        label: "Funding Amount",
        data: amounts,
        backgroundColor: Object.values(CHART_COLORS).slice(0, data.length),
      },
    ],
  };
};

const DoughnutChartComponent = ({
  startupFundingData,
}: {
  startupFundingData: any;
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const topStartups = getTopStartups(startupFundingData, 5);
    const data = prepareChartData(topStartups);
    setChartData(data);
  }, []);

  const config = {
    type: "doughnut",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Top 5 Startups with Highest Funding",
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={chartData} options={config.options} />
    </div>
  );
};

export default DoughnutChartComponent;
