import { useEffect, useState } from "react";
import { ApiUrl } from "../utils/api";
import axios from "axios";
import { getAuthToken } from "../hooks/collaboration/getAuthToken";
import LoadingSection from "./LoadingSection";

export default function DataOverviewSection() {
  const [overviewInfo, setOverviewInfo] = useState({
    startups: 0,
    investors: 0,
    fundings: 0,
    averageFunds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const datas = await GetOverviewInfo();
      setOverviewInfo(datas);
    }

    getData();
    setIsLoading(false);
  }, []);

  return (
    <section className="my-10 flex justify-between gap-8 items-center md:flex-col">
      {isLoading ? (
        <LoadingSection />
      ) : (
        <>
          <section className="w-1/2 flex justify-between gap-8 md:w-full sm:flex-col">
            <OverviewCard
              title="Total Investor"
              value={overviewInfo.investors.toString()}
              icon="users"
              isUp={true}
              change={0.6}
            />
            <OverviewCard
              title="Total Startups"
              value={overviewInfo.startups.toString()}
              icon="start"
              isUp={true}
              change={1.4}
            />
          </section>
          <section className="w-1/2 flex justify-between gap-8 md:w-full sm:flex-col">
            <OverviewCard
              title="Total Fundings"
              value={overviewInfo.fundings.toString()}
              icon="total"
              isUp={true}
              change={2.6}
            />
            <OverviewCard
              title="Average Funds"
              value={overviewInfo.averageFunds.toString()}
              icon="average"
              isUp={true}
              change={0.6}
            />
          </section>
        </>
      )}
    </section>
  );
}

interface OverviewCardProps {
  title: string;
  value: string;
  icon: string;
  isUp: boolean;
  change?: number;
}
function OverviewCard({ title, value, icon, isUp, change }: OverviewCardProps) {
  return (
    <article className="bg-white rounded-2xl w-full flex flex-col p-6 justify-between gap-6">
      <section className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="font-bold text-xl">{value}</p>
        </div>
        <img
          src={`/icons/${icon}.png`}
          className={`w-10 h-10 rounded-2xl p-2 object-contain bg-orange-500/10`}
        />
      </section>
      <div className="flex items-center gap-2">
        <img
          src={`/icons/${isUp ? "up" : "down"}.png`}
          alt="icon"
          className="w-6"
        />
        <p>
          <span className={`${isUp ? "text-green-500" : "text-red-500"}`}>
            {change}%
          </span>{" "}
          Up Monthly
        </p>
      </div>
    </article>
  );
}

async function GetOverviewInfo() {
  const token = getAuthToken();
  const urls = ["business-startup", "investor", "business-investment"];
  const datas = await Promise.all(
    urls.map((url) =>
      axios.get(`${ApiUrl}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
  );

  return {
    startups: datas[0].data.length,
    investors: datas[1].data.length,
    fundings: datas[2].data.reduce(
      (acc: number, curr: any) => acc + curr.amount,
      0
    ),
    averageFunds:
      datas[2].data.reduce((acc: number, curr: any) => {
        return acc + curr.amount;
      }, 0) / datas[2].data.length,
  };
}
