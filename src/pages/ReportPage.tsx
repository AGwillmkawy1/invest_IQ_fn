import DataOverviewSection from "../components/DataOverviewSection";
import LoadingSection from "../components/LoadingSection";
import useGetReports, { ReportDot } from "../hooks/useGetReports";

export default function ReportPage() {
  const { reports, loading } = useGetReports();

  if (loading) {
    return <LoadingSection />;
  }

  return (
    <article className="px-16 md:px-12 sm:px-6">
      <DataOverviewSection />
      <article>
        <section className="w-full">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  Investment Records
                </h2>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Investor
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Startup
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report, index) => (
                        <TableRow key={index} {...report} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-1/4 bg-red-200"></section>
      </article>
    </article>
  );
}

function TableRow({
  amount,
  created_at,
  business_startup,
  investor,
}: ReportDot) {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full object-cover"
              src={investor?.profilePic}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {investor?.firstName + " " + investor?.lastName}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full object-cover"
              src={business_startup?.profilePic}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {business_startup?.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${amount}</p>
        <p className="text-gray-600 whitespace-no-wrap">USD</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* dayjs transform this "2024-07-18" to the format of 18 july 2024 */}
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(created_at).toDateString()}
        </p>
      </td>
    </tr>
  );
}
