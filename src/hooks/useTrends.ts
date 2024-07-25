import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../utils/api";
import { getAuthToken } from "./collaboration/getAuthToken";
import { useAuthContext } from "../context/AuthContext";

interface ChartData {
  DoughnutData: any;
  PieData: any;
  LineData: any;
  BarData: any;
}

export default function useTrends() {
  const [trends, setTrends] = useState<ChartData>({
    DoughnutData: null,
    PieData: null,
    LineData: null,
    BarData: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuthContext();

  useEffect(() => {
    async function getTrends() {
      try {
        setLoading(true);
        const data = await fetchTrends();
        setTrends(data as ChartData); // Add type assertion here
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          logout();
        }
        console.log(error);
        setLoading(false);
      }
    }

    getTrends();
  }, []);

  return { trends, loading };
}

const fetchTrends = async () => {
  const url = ApiUrl + "/trends";
  const token = getAuthToken();
  const allTrends = ["location", "business-type", "start-up"];

  try {
    const response = await Promise.all(
      allTrends.map((trend) =>
        axios.get(`${url}/${trend}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    );

    const [location, businessType, startUp] = response;

    return {
      BarData: location.data,
      PieData: businessType.data,
      LineData: startUp.data,
      DoughnutData: startUp.data,
    };
  } catch (error) {
    throw error;
  }
};
