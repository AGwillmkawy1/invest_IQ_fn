import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { ApiUrl } from "../../utils/api";

export default function useLogout() {
  const [isLoadings, setIsLoading] = useState(false);
  const { login: setAuthUser } = useAuthContext();

  async function logout() {
    setIsLoading(true);
    try {
      const res = await fetch(`${ApiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("currentUser");
      localStorage.removeItem("chatToken");
      setAuthUser(null, null);
    } catch (error) {
      toast.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoadings, logout };
}
