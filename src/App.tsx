import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Auth/HomePage";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import CollaborationPage from "./pages/CollaborationPage";
import RiskManagement from "./pages/RiskManagement";
import ReportPage from "./pages/ReportPage";
import InvestmentEvaluationPage from "./pages/InvestmentEvaluationPage";
import SettingsPage from "./pages/SettingsPage";
import FundingAllocationPage from "./pages/FundingAllocationPage";
import DueDelligence from "./pages/DueDelligence";
import AsideNavigation from "./components/AsideNavigation";
import ProfilePage from "./pages/ProfilePage";
import homeLoader from "./utils/loaders/homeLoader";
import authLoader from "./utils/loaders/authLoader";

export default function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />} loader={homeLoader} />
        <Route path="login" element={<LoginPage />} loader={homeLoader} />
        <Route path="signup" element={<SignupPage />} loader={homeLoader} />
        <Route element={<AsideNavigation />} loader={authLoader}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="funding-allocation"
            element={<FundingAllocationPage />}
          />
          <Route path="risk-management" element={<RiskManagement />} />
          <Route
            path="investment-evaluation"
            element={<InvestmentEvaluationPage />}
          />
          <Route path="due-diligence" element={<DueDelligence />} />
          <Route path="collaboration" element={<CollaborationPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    )
  );
  return (
    <article>
      <RouterProvider router={route} />
    </article>
  );
}
