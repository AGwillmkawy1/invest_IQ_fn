export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="text-white py-20 px-20 md:px-12 sm:px-4 flex flex-col justify-between items-center gap-8"
    >
      <section className="bg-[url('/hero.webp')] bg-opacity-25 w-full bg-center h-60 flex flex-col gap-4 justify-center items-center">
        <p className="w-4/5 text-center text-xl">
          Join a community of like-minded investors committed to making a
          difference. By investing in companies that prioritize social and
          environmental responsibility, you're not just generating returns –
          you're driving positive change and creating a better future for
          generations to come.
        </p>
      </section>
      <section className="flex gap-6 w-full">
        <div className="w-1/4 bg-black border border-mainGreen text-white rounded-xl flex flex-col justify-between items-center gap-2 text-center px-4 py-2">
          <img src="/income.svg" className="w-20 object-contain" />
          <p className="font-bold text-mainGreen">High Returns</p>
          <p>
            With cash flow positive companies throughout Norrsken, it’s a smart
            option. It creates genuine opportunities.
          </p>
        </div>
        <div className="w-1/4 bg-black border border-mainGreen text-white rounded-xl flex flex-col justify-between items-center gap-2  text-center px-4 py-2">
          <img src="/liquid.svg" className="w-20 object-contain" />
          <p className="font-bold text-mainGreen">Liquidity</p>
          <p>
            The past 24 months Norrsken has shown continual growth across the
            metro area, the forecasts present more movement which is makes for a
            viable investment.
          </p>
        </div>
        <div className="w-1/4 bg-black border border-mainGreen text-white rounded-xl flex flex-col justify-between items-center gap-2  text-center px-4 py-2">
          <img src="/safe.png" className="w-20 object-contain" />
          <p className="font-bold text-mainGreen">Safety</p>
          <p>
            Norrsken currently holds the lowest medium house price, amazing
            yields, has strong migration, major infrastructure planned.
            Investors are recognising the strength of Norrsken’s economy.
          </p>
        </div>
        <div className="w-1/4 bg-black border border-mainGreen text-white rounded-xl flex flex-col justify-between items-center gap-2 text-center px-4 py-2">
          <img src="/divers.png" className="w-20 object-contain" />
          <p className="font-bold text-mainGreen">Diversity</p>
          <p>
            Investing  is a mind decision over following your heart, however we
            understand its extension of your life. Offering a wide range of
            companies.
          </p>
        </div>
      </section>
    </section>
  );
}
