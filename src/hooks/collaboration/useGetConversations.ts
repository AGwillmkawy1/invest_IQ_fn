import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAuthToken } from "./getAuthToken";
import { ApiUrl } from "../../utils/api";
import { Investor, StartUp } from "../../interfaces/interfaces";

interface ConversationTypes {
  investors: Investor[];
  startups: StartUp[];
}

export default function useGetConversation() {
  const [isLoading, setIsLoadingState] = useState(false);
  const [conversations, setConversations] = useState<ConversationTypes>({
    investors: [],
    startups: [],
  });
  const token = getAuthToken();

  useEffect(() => {
    async function getConversations() {
      setIsLoadingState(true);
      try {
        const investors = await fetch(`${ApiUrl}/investor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const startups = await fetch(`${ApiUrl}/business-startup`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const investorsList = await investors.json();
        const startupsList = await startups.json();

        setConversations({
          investors: investorsList,
          startups: startupsList,
        });
      } catch (error) {
        toast.error(JSON.stringify(error));
      } finally {
        setIsLoadingState(false);
      }
    }

    getConversations();
  }, [token]);

  return { isLoading, conversations };
}
