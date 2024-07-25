import { Outlet } from "react-router";
import CustomNavLink from "./CustomNavLink";
import { useAuthContext } from "../context/AuthContext";

export default function AsideNavigation() {
  const { userInfo, isInvestor, logout } = useAuthContext();
  return (
    <article className="relative flex justify-end text-black">
      <section className="fixed top-0 left-0 h-screen w-1/5 bg-white p-6 flex flex-col justify-between md:hidden">
        <section className="flex flex-col gap-8">
          <img src="/logo-b.png" alt="" className="w-32" />
          <section className="flex flex-col gap-4">
            <CustomNavLink to="/dashboard" text="Dashboard" icon="dash" />
            <CustomNavLink
              to="/funding-allocation"
              text="Funding Allocation"
              icon="fund"
            />
            <CustomNavLink
              to="/investment-evaluation"
              text="Investment Evaluation"
              icon="inve"
            />
            <CustomNavLink
              to="/due-diligence"
              text="Due Diligence"
              icon="due"
            />
            <CustomNavLink
              to="/risk-management"
              text="Risk Management"
              icon="risk"
            />
            <CustomNavLink
              to="/collaboration"
              text="Collaboration"
              icon="chat"
            />
            <CustomNavLink to="/report" text="Report" icon="rep" />
          </section>
        </section>
        <section className="border-t border-mainGreen flex flex-col gap-2 py-6">
          <CustomNavLink to="/profile" text="Profile" icon="prof" />
          <CustomNavLink to="/settings" text="Settings" icon="set" />
          <button
            className="text-black flex gap-4 px-6 py-2 rounded-xl"
            onClick={logout}
          >
            <img src="/icons/logout.png" className="w-7 object-contain" />
            <p>Log Out</p>
          </button>
        </section>
      </section>
      <section className="bg-mainGreen/15 w-4/5 min-h-screen md:w-full">
        <section
          className="w-full sticky top-0 py-2 px-6 bg-white flex justify-between items-center border-b-2 border-mainGreen
        "
        >
          <div className="flex items-center gap-8">
            <img src="/icons/menu.png" alt="" className="w-8 object-contain" />
            <input
              type="text"
              placeholder="Search"
              className="px-6 py-1 rounded-xl bg-transparent border border-mainGreen  w-72 md:hidden"
            />
          </div>
          <div className="flex items-center gap-3 text-end">
            <div>
              <p className="font-semibold">{userInfo.names}</p>
              <p>{isInvestor ? "Investor" : "Startup"}</p>
            </div>
            <img
              src={userInfo.profilePic}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </section>
        <section>
          <Outlet />
        </section>
      </section>
    </article>
  );
}
