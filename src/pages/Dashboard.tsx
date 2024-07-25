import DataOverviewSection from "../components/DataOverviewSection";
import LoadingSection from "../components/LoadingSection";
import BarChart from "../components/charts/BarChart";
import DoughnutChartComponent from "../components/charts/DoughnutChart";
import LineChartComponent from "../components/charts/LinearScale";
import PieChart from "../components/charts/PieChart";
import useTrends from "../hooks/useTrends";
import {
  pieDatas,
  startupData,
  startupFundingData,
} from "../utils/fallBackValues";

export default function Dashboard() {
  const { trends, loading } = useTrends();

  if (loading) {
    return <LoadingSection />;
  }

  const DoughnutData = Boolean(
    trends.DoughnutData && trends.DoughnutData?.length
  )
    ? trends.DoughnutData
    : startupFundingData;

  const PieData =
    trends.PieData && trends.PieData.length ? trends.PieData : pieDatas;

  const BarData =
    trends.BarData && trends.BarData.length ? trends.BarData : startupData;

  return (
    <article className="px-16 py-10 md:px-10 sm:px-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DataOverviewSection />
      <section className="w-full flex justify-between gap-10 mb-8">
        <div className="w-1/2 bg-white rounded-2xl">
          <DoughnutChartComponent startupFundingData={DoughnutData} />
        </div>
        <PieChart investmentData={PieData} />
      </section>
      <section className=" w-full flex justify-between gap-10 h-[30rem] mb-24">
        <div className="w-full bg-white h-fit rounded-2xl p-12 md:p-8 sm:p-5">
          <LineChartComponent />
        </div>
      </section>
      <div className="w-full h-full bg-white rounded-xl p-12 md:p-8 sm:p-5">
        <BarChart startupData={BarData} />
      </div>
    </article>
  );
}
