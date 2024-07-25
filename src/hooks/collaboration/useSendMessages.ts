import { useState } from "react";
import toast from "react-hot-toast";
import { getAuthToken } from "./getAuthToken";
import { useConversationContext } from "../../context/useConversation";
import { ApiUrl } from "../../utils/api";
import { Conversation } from "../../interfaces/interfaces";
import { useAuthContext } from "../../context/AuthContext";
import { Except } from "type-fest";
import useGetMessages from "../useGetMessages";

export default function useSendMessage() {
  const token = getAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const { addMessage } = useGetMessages();

  async function sendMessage(message: any) {
    setIsLoading(true);

    const newConversation: Except<Conversation, "id" | "createdAt" | "isRead"> =
      {
        message,
        receiverId: selectedConversation.id,
        senderId: userInfo.id,
      };

    try {
      const response = await fetch(`${ApiUrl}/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newConversation),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      addMessage(data);
      return data;
    } catch (error) {
      toast.error(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, sendMessage };
}
