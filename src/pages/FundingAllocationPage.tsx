import DataOverviewSection from "../components/DataOverviewSection";
import useGetStartups from "../hooks/useGetStartups";
import { FormEvent, useState } from "react";
import { Fund, StartUp } from "../interfaces/interfaces";
import LoadingSection from "../components/LoadingSection";
import { sectors, stages } from "../interfaces/enums";
import { Except } from "type-fest";
import { useAuthContext } from "../context/AuthContext";
import createInvestment from "../utils/createInvestment";
import Loading from "react-loading";

export default function FundingAllocationPage() {
  const [sector, setSector] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [startupId, setStartupId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { startups, loading } = useGetStartups();
  const { userInfo } = useAuthContext();

  if (loading) {
    return <LoadingSection />;
  }

  async function handleCreateFund(
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) {
    e.preventDefault();
    setIsLoading(true);
    if (!startupId || !amount || !date || !contact || !numberOfDays) {
      return;
    }

    const selectedStartup = startups.find(
      (startup) => startup.id === startupId
    );

    const grouthRatio = selectedStartup?.growthRate || 0;

    const startCost = selectedStartup?.cost || 0;
    const endCost = startCost + startCost * grouthRatio * numberOfDays;
    const finalAmount = amount + amount * grouthRatio * numberOfDays;
    const ROI = finalAmount - amount;

    const fund: Except<Fund, "id"> = {
      investorId: userInfo.id,
      businessId: startupId,
      amount,
      numberOfDays,
      startCost,
      endCost,
      ROI,
    };

    const response = await createInvestment(fund);
    console.log(response);
    setIsLoading(false);
  }

  const filteredStartups = filterStartups(startups);

  function filterStartups(startups: StartUp[]) {
    if (!sector && !stage) {
      return startups;
    }
    if (!sector) {
      return startups.filter((startup) => startup.stage === stage);
    }
    if (!stage) {
      return startups.filter((startup) => startup.businessType === sector);
    }
    return startups.filter(
      (startup) => startup.stage === stage && startup.stage === sector
    );
  }

  return (
    <article className="px-12 py-8">
      <h1 className="text-3xl font-bold">Funding Allocation Page</h1>
      <DataOverviewSection />
      <h1 className="text-3xl font-bold mb-6">Create New Fund</h1>
      <form className="flex flex-col gap-6" onSubmit={handleCreateFund}>
        <section className="flex justify-between gap-6">
          <label className="flex flex-col gap-1 w-full">
            Choose sector to invest in
            <select
              className="bg-white/50 border border-gray-300 rounded-lg px-4 py-2 outline-none"
              onChange={(e) => setSector(e.target.value)}
            >
              <option value="">Select Sector</option>
              {sectors.map((sector, ind) => (
                <option value={sector} key={ind}>
                  {sector}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 w-full">
            Stage of startup
            <select
              className="bg-white/50 border border-gray-300 rounded-lg px-4 py-2 outline-none"
              onChange={(e) => setStage(e.target.value)}
            >
              <option value="">Select Stage</option>
              {stages.map((stage) => (
                <option value={stage} key={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>
        </section>
        <section className="flex justify-between gap-6">
          <label className="block w-full">
            Choose startup
            <select
              className="w-full border border-gray-300 rounded-xl p-2 bg-white/50"
              onChange={(e) => setStartupId(e.target.value)}
            >
              <option value="0">Select startup</option>
              {filteredStartups.map((startup) => (
                <option key={startup.id} value={startup.id}>
                  {startup.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block w-full">
            Amount to invest
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-xl p-2 bg-white/50"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
        </section>
        <section className="flex justify-between gap-6">
          <label className="block w-full">
            Date to invest
            <input
              type="date"
              id="date"
              placeholder="Enter date"
              className="w-full border border-gray-300 rounded-xl p-2 bg-white/50"
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="block w-full">
            Contact details
            <input
              type="text"
              id="contact"
              placeholder="Enter contact details"
              className="w-full border border-gray-300 rounded-xl p-2 bg-white/50"
              onChange={(e) => setContact(e.target.value)}
            />
          </label>
        </section>
        <label className="block w-full">
          Number of months to invest
          <input
            type="number"
            id="numberOfDays"
            placeholder="Enter number of months"
            className="w-full border border-gray-300 rounded-xl p-2 bg-white/50"
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
          />
        </label>
        <button
          className="bg-mainGreen text-white px-10 py-2 rounded-xl"
          onClick={handleCreateFund}
        >
          {isLoading ? <Loading /> : "Create Fund"}
        </button>
      </form>
    </article>
  );
}
