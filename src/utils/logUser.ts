import { ApiUrl } from "./api";
import axios from "axios";
import {
  InvestorSignupDto,
  LoginReqDto,
  LoginRespDto,
  StartUpSignupDto,
} from "../interfaces/interfaces";

export async function handleLogin({
  email,
  password,
  isInvestor,
}: LoginReqDto) {
  const url = `${ApiUrl}/login/${isInvestor ? "investor" : "business-startup"}`;
  try {
    const user = await axios.post<LoginRespDto>(url, {
      email,
      password,
    });
    if (!user) {
      return false;
    }
    return user.data;
  } catch (error) {
    console.log(error, "error in login");
    throw new Error("Login Failed");
  }
}

export async function signup(
  user: InvestorSignupDto | StartUpSignupDto,
  isInvestor: boolean
) {
  const url = `${ApiUrl}/${isInvestor ? "investor" : "business-startup"}`;
  try {
    const newUser = await axios.post<LoginRespDto>(url, user);
    const { data } = newUser;
    return data;
  } catch (error) {
    console.log(error, "error in signup");
    throw new Error("Signup Failed");
  }
}
