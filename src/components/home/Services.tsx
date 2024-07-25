export default function Services() {
  return (
    <section className="bg-white text-black py-20 px-20 md:px-12 sm:px-4">
      <section className="flex flex-col justify-center items-center gap-8">
        <h1 className="text-4xl md:text-3xl sm:text-xl font-bold">
          Our Services
        </h1>
        <section className="flex flex-col gap-8 w-4/5">
          <section className="flex flex-col gap-4 w-4/5">
            <h2 className="text-2xl font-bold">Portfolio Management</h2>
            <p className="text-lg">
              Our centralized dashboard offers real-time visibility into your
              investment portfolios, fund performance, and allocation
              strategies. With AI-driven analytics tools, we analyze portfolio
              metrics, performance indicators, and risk factors to optimize your
              investment decision-making and portfolio diversification.
            </p>
          </section>
          <section className="flex flex-col gap-4 w-4/5 self-end text-end">
            <h2 className="text-2xl font-bold">Predictive Evaluation</h2>
            <p className="text-lg">
              Our platform utilizes cutting-edge machine learning algorithms to
              assess the potential return on investment (ROI), financial
              viability, and scalability of social impact ventures and startups.
              By analyzing historical investment data, industry benchmarks, and
              success factors, we provide accurate forecasts of investment
              outcomes and identify high-potential opportunities for you.
            </p>
          </section>
          <section className="flex flex-col gap-4 w-4/5">
            <h2 className="text-2xl font-bold">Funding Allocation</h2>
            <p className="text-lg">
              Our optimization algorithms empower you to tailor funding
              allocation strategies precisely to your investment criteria,
              impact objectives, risk tolerance, and financial constraints.
              Leveraging sophisticated portfolio optimization techniques, we
              strike the perfect balance between risk and return, maximizing
              social impact metrics while aligning investment allocations
              seamlessly with Norrsken's mission and strategic priorities.
            </p>
          </section>
        </section>
      </section>
    </section>
  );
}
