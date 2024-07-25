import axios from "axios";
import toast from "react-hot-toast";
import { getAuthToken } from "../hooks/collaboration/getAuthToken";
import { Fund } from "../interfaces/interfaces";
import { ApiUrl } from "./api";
import { Except } from "type-fest";

export default async function createInvestment(fund: Except<Fund, "id">) {
  const token = getAuthToken();
  const url = `${ApiUrl}/business-investment`;

  try {
    const response = await axios.post<Fund>(url, fund, {
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
