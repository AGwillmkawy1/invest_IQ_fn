import toast from "react-hot-toast";
import { ApiUrl } from "../utils/api";
import { getAuthToken } from "./collaboration/getAuthToken";
import axios from "axios";
import { useEffect, useState } from "react";
export interface ReportDot {
  amount: number;
  created_at: string;
  business_startup: {
    name: string;
    profilePic: string;
  };
  investor: {
    firstName: string;
    lastName: string;
    profilePic: string;
  };
}

export default function useGetReports() {
  const [reports, setReports] = useState<ReportDot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchReportsData() {
      const reports = await fetchReports();
      setReports(reports as ReportDot[]);
      setLoading(false);
    }

    fetchReportsData();
  }, []);

  return { reports, loading };
}

async function fetchReports() {
  const token = getAuthToken();
  const url = ApiUrl + "/trends/investor-business";

  try {
    const response = await axios.get<ReportDot[]>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch reports");
  }
}
