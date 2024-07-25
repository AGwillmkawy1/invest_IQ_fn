import { useEffect, useState } from "react";
import { getAuthToken } from "./collaboration/getAuthToken";
import { ApiUrl } from "../utils/api";
import toast from "react-hot-toast";
import axios from "axios";

export interface InvestmentDto {
  investorId: string;
  businessId: string;
  amount: number;
  startCost: number;
  endCost: number;
  numberOfDays: number;
  ROI: number;
  id: string;
  created_at: string;
}

export default function useGetInvestments() {
  const [investments, setInvestments] = useState<InvestmentDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allInvestments = await getInvestments();
        if (allInvestments) {
          setInvestments(allInvestments);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch investments");
        setError("Failed to fetch investments");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { investments, loading, error };
}

async function getInvestments() {
  const token = getAuthToken();
  const url = `${ApiUrl}/business-investment`;

  try {
    const response = await axios.get<InvestmentDto[]>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch startups");
  }
}
