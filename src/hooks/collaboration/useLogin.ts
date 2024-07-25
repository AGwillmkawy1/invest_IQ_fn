import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { LoginReqDto } from "../../interfaces/interfaces";
import { ApiUrl } from "../../utils/api";

export default function useLogin() {
  const { login: HandleLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  async function login({ email, password }: LoginReqDto) {
    if (!validateInputs(email, password)) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${ApiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const currentUser = await response.json();
      if (currentUser.error) {
        throw new Error(currentUser.error);
      }
      setIsLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(currentUser.response));
      localStorage.setItem(
        "chatToken",
        JSON.stringify(currentUser.response.token)
      );
      HandleLogin(currentUser, false);

      return currentUser;
    } catch (error) {
      toast.error("System Error, Try again");
      setIsLoading(false);
    }
  }
  return { isLoading, login };
}

function validateInputs(userName: string, password: string) {
  if (!userName || !password) {
    toast.error("Fill all inputs");
    return false;
  }

  if (userName !== userName.split(" ").join("")) {
    toast.error("No spaces in Username");
    return false;
  }

  return true;
}
