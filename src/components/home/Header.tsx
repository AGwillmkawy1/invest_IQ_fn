import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="px-20 py-8 md:px-12 md:py-5 sm:px-4 sm:py-3 flex justify-between items-center">
      <img src="/logo-w.png" className="w-40 object-contain" />
      <section className="md:hidden flex gap-4">
        <NavLink
          to="#aboutus"
          className="hover:underline hover:text-mainGreen text-m"
        >
          About Us
        </NavLink>
        <NavLink
          to="#howitworks"
          className="hover:underline hover:text-mainGreen text-m"
        >
          How It Works
        </NavLink>
        <NavLink
          to="#services"
          className="hover:underline hover:text-mainGreen text-m"
        >
          Services
        </NavLink>
        <NavLink
          to="#contactus"
          className="hover:underline hover:text-mainGreen text-m"
        >
          Contact Us
        </NavLink>
      </section>
      <section className="flex gap-4">
        <CustomButton
          text="Log In"
          onPress={() => {
            navigate("/login");
          }}
          variant="secondary"
        />
        <CustomButton
          text="Get Started"
          onPress={() => {
            navigate("/signup");
          }}
        />
      </section>
    </header>
  );
}
