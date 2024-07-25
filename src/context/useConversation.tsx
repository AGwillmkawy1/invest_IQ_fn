import { createContext, useContext, useEffect, useState } from "react";

interface ConversationContextProps {
  conversations: any[];
  setConversations: (conversations: any[]) => void;
  selectedConversation: any;
  setSelectedConversation: (conversation: any) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

const conversationContext = createContext<ConversationContextProps>({
  conversations: [],
  setConversations: () => {},
  selectedConversation: null,
  setSelectedConversation: () => {},
  messages: [],
  setMessages: () => {},
  isTyping: false,
  setIsTyping: () => {},
});

export const useConversationContext = () => {
  return useContext(conversationContext);
};

export default function ConversationContextProvider({
  children,
}: {
  children: any;
}) {
  const [conversations, setConversations] = useState<any>([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState<any>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {}, []);

  return (
    <conversationContext.Provider
      value={{
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </conversationContext.Provider>
  );
}
