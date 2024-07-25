import DataOverviewSection from "../components/DataOverviewSection";
import LoadingSection from "../components/LoadingSection";
import BarChart from "../components/charts/BarChart";
import useTrends from "../hooks/useTrends";
import { startupData } from "../utils/fallBackValues";

export default function RiskManagement() {
  const { loading, trends } = useTrends();

  if (loading) {
    return <LoadingSection />;
  }

  const BarData =
    trends.BarData && trends.BarData.length ? trends.BarData : startupData;

  return (
    <article className="px-16 md:px-10 sm:px-4 pt-12">
      <h2 className="font-bold text-2xl">Risk Management</h2>
      <DataOverviewSection />
      <h2 className="font-bold text-2xl mb-6">Trending Business Sectors</h2>
      <section>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Business Sectors
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total Investments
              </th>
            </tr>
          </thead>
          <tbody>
            {trends.PieData.map((data, index) => (
              <TableRow key={index} {...data} />
            ))}
          </tbody>
        </table>
      </section>
      <h2 className="font-bold text-2xl my-6">Trending Startup</h2>
      <section>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Startup Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total Investments
              </th>
            </tr>
          </thead>
          <tbody>
            {trends.DoughnutData.map((data, index) => (
              <TableRow2 key={index} {...data} />
            ))}
          </tbody>
        </table>
      </section>
      <h2 className="font-bold text-2xl my-6">Best Investment Location</h2>
      <div className="w-full h-full bg-white rounded-xl p-12 md:p-8 sm:p-5">
        <BarChart startupData={BarData} />
      </div>
    </article>
  );
}

function TableRow({ amount, businessType }: any) {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{businessType}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${amount}</p>
        <p className="text-gray-600 whitespace-no-wrap">USD</p>
      </td>
    </tr>
  );
}
function TableRow2({ amount, businessName }: any) {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{businessName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${amount}</p>
        <p className="text-gray-600 whitespace-no-wrap">USD</p>
      </td>
    </tr>
  );
}
