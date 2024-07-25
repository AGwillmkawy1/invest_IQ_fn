import { createContext, useContext, useEffect, useState } from "react";
import { LoginRespDto } from "../interfaces/interfaces";

interface AuthContext {
  userInfo: LoginRespDto;
  isInvestor: boolean;
  login: (user: LoginRespDto, isInvestor: boolean, token: string) => void;
  logout: () => void;
}

const authContext = createContext<AuthContext>({
  userInfo: {
    id: "",
    email: "",
    names: "",
    phone: "",
    profilePic: "",
    token: "",
  },
  login: () => {},
  logout: () => {},
  isInvestor: false,
});

export default function AuthContextProvider({ children }: any) {
  const [userInfo, setUserInfo] = useState<LoginRespDto>({
    id: "",
    names: "",
    email: "",
    phone: "",
    profilePic: "",
    stage: "",
    token: "",
  });
  const [token, setToken] = useState("");
  const [isInvestor, setIsInvestor] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const isInvestor = localStorage.getItem("isInvestor");

    if (token && user) {
      setToken(token);
      setUserInfo(JSON.parse(user));
      setIsInvestor(isInvestor === "true");
    } else {
      setToken("");
      setUserInfo({
        id: "",
        names: "",
        email: "",
        phone: "",
        profilePic: "",
        stage: "",
        token: "",
      });
      setIsInvestor(false);
    }
  }, []);

  function login(user: LoginRespDto, isInvestor: boolean, token: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("isInvestor", isInvestor.toString());
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUserInfo(user);
    setIsInvestor(isInvestor);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isInvestor");
    localStorage.removeItem("user");
    setToken("");
    setUserInfo({
      id: "",
      names: "",
      email: "",
      phone: "",
      profilePic: "",
      stage: "",
      token: "",
    });
    setIsInvestor(false);
    window.location.reload();
  }

  const values = {
    userInfo,
    token,
    login,
    logout,
    isInvestor: isInvestor,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

export function useAuthContext() {
  return useContext(authContext);
}
