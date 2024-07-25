import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { ApiUrl } from "../utils/api";
import axios from "axios";
import { getAuthToken } from "./collaboration/getAuthToken";

export default function useGetMessages() {
  const [messages, setMessages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      const data = await getMessages();
      const userMessages = data.filter(
        (mes: any) =>
          mes.senderId === userInfo.id || mes.receiverId === userInfo.id
      );
      setMessages(userMessages);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function addMessage(message: any) {
    setMessages([...messages, message]);
  }

  return { isLoading, messages, getMessages, addMessage };
}

async function getMessages() {
  const url = ApiUrl + "/conversation";
  const token = getAuthToken();
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}
