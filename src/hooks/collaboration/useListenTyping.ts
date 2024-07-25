import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { useConversationContext } from "../../context/useConversation";

export default function () {
  const { socket } = useSocketContext();
  const { setIsTyping } = useConversationContext();

  useEffect(() => {
    socket?.on("receiveTyping", () => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    });

    return () => socket?.off("receiveTyping");
  }, [setIsTyping, socket]);
}
