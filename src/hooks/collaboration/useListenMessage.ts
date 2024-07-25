import { useEffect } from "react";
import notificationSound from "/sounds/notification.mp3";
import { useSocketContext } from "../../context/SocketContext";
import { useConversationContext } from "../../context/useConversation";

export default function () {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket]);
}
