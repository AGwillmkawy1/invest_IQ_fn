import { NavLink, useMatch } from "react-router-dom";

type CustomNavLinkProps = {
  to: string;
  text: string;
  icon: string;
};

export default function CustomNavLink({ to, text, icon }: CustomNavLinkProps) {
  const isActive = useMatch(to);
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive ? "bg-mainGreen text-white" : "text-black"
        } flex gap-4 px-6 py-2 rounded-xl`
      }
    >
      <img
        src={`/icons/${icon}${isActive ? "w" : ""}.png`}
        className="w-7 object-contain"
      />
      <p>{text}</p>
    </NavLink>
  );
}
