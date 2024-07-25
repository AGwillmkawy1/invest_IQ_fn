import { useEffect, useState } from "react";
import { StartUp } from "../interfaces/interfaces";
import { getAuthToken } from "./collaboration/getAuthToken";
import { ApiUrl } from "../utils/api";
import toast from "react-hot-toast";
import axios from "axios";

export default function useGetStartups() {
  const [startups, setStartUps] = useState<StartUp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startups = await getStartups();
        if (startups) {
          setStartUps(startups);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch startups");
        setError("Failed to fetch startups");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { startups, loading, error };
}

async function getStartups() {
  const token = getAuthToken();
  const url = `${ApiUrl}/business-startup`;

  try {
    const response = await axios.get<StartUp[]>(url, {
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
