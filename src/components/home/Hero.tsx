import { useNavigate } from "react-router";
import CustomButton from "../CustomButton";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="text-white py-20 px-20 md:px-12 sm:px-4 bg-[url('/hero.webp')] bg-opacity-25 h-[30rem] bg-cover relative flex justify-center items-center">
      <section className="flex flex-col justify-center items-center w-4/5 gap-8 d">
        <h1 className="text-4xl md:text-3xl sm:text-xl font-bold text-white">
          Empowering Smarter Investments for Greater Impact
        </h1>
        <p className="text-lg md:text-base sm:text-sm text-center">
          Unlock the potential of your investments with our intelligent
          platform. Connect with startups, analyze past performance across
          sectors, and leverage predictive tools to forecast your returns. Make
          data-driven decisions and maximize your social impact today.
        </p>
        <CustomButton
          text="Get Started"
          onPress={() => {
            navigate("/signup");
          }}
        />
      </section>
    </section>
  );
}
