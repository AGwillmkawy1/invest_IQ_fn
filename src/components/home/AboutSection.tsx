import CustomButton from "../CustomButton";

export default function AboutSection() {
  function handleScrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="aboutus"
      className="bg-white text-black py-20 px-20 md:px-12 sm:px-4 flex justify-between items-center gap-8"
    >
      <img src="/about.jpg" className="w-1/3 h-96 object-cover" />
      <section className="w-2/3 flex flex-col gap-12">
        <h1 className="text-7xl font-bold -ml-40">ABOUT US</h1>
        <p>
          InvestIQ is transforming the investment landscape by connecting
          investors with promising startups. Our platform uses advanced
          analytics and predictive tools to provide insights and optimize
          portfolios, empowering investors to make informed decisions and
          maximize their impact. With features like automated due diligence,
          predictive investment models, and risk management tools, we streamline
          the entire investment process. Our goal is to bridge the gap between
          investors and innovative ventures, driving sustainable development and
          social impact.
        </p>
        <CustomButton text="Contact Us" onPress={handleScrollToBottom} />
      </section>
    </section>
  );
}
