import NotSelected from "./NotSelected";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Loading from "react-loading";
import MessagesSection from "./MessagesSection";
import { useSocketContext } from "../../context/SocketContext";
import useSendMessage from "../../hooks/collaboration/useSendMessages";
import { useConversationContext } from "../../context/useConversation";
import useListenMessage from "../../hooks/collaboration/useListenMessage";
import useListenTyping from "../../hooks/collaboration/useListenTyping";
import useGetMessages from "../../hooks/useGetMessages";

export default function Chat() {
  const [allMessages, setAllMessages] = useState<any>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket } = useSocketContext();
  const { isLoading, sendMessage } = useSendMessage();
  const { selectedConversation, setSelectedConversation, isTyping } =
    useConversationContext();
  const { isLoading: messagesLoading, messages } = useGetMessages();

  const lastMessageRef = useRef(null);
  useListenMessage();
  useListenTyping();

  console.log(allMessages);

  useEffect(() => {
    if (!messagesLoading) {
      setAllMessages(messages);
    }
    (lastMessageRef.current as HTMLElement | null)?.scrollIntoView({
      behavior: "smooth",
    });
    return () => setSelectedConversation(null);
  }, [setSelectedConversation, messagesLoading, messages]);

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentMessage) {
      toast.error("Write message");
    }
    const newMessage = await sendMessage(currentMessage);
    setAllMessages([...allMessages, newMessage]);
    setCurrentMessage("");
  }

  return selectedConversation ? (
    <article className="flex h-full flex-col justify-between">
      <section className="w-full border-b border-purple-200/20 bg-mainGreen/35 px-10 py-1 md:px-6 sm:px-2">
        <Header conversation={selectedConversation} />
      </section>
      <MessagesSection
        messages={allMessages.filter(
          (mes: any) =>
            mes.senderId === selectedConversation?.id ||
            mes.receiverId === selectedConversation?.id
        )}
      />
      <section className="w-full bg-bla-300 border-t border-pup-100/20 flex flex-col justify-center px-10 md:px-6 sm:px-2 relative">
        <form
          className="w-full flex justify-between gap-2 items-center"
          onSubmit={handleSendMessage}
        >
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            value={currentMessage}
            onChange={(e) => {
              socket.emit("sendTyping", { id: selectedConversation.id });
              setCurrentMessage(e.target.value);
            }}
            placeholder="Type message ..."
          />
          <button className="bg-pup-200 px-8 py-2  rounded-xl">
            {isLoading ? (
              <Loading
                height={30}
                width={30}
                type="spinningBubbles"
                color="#000000"
              />
            ) : (
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">Send</p>
                <img className="w-5" src="/send.png" alt="" />
              </div>
            )}
          </button>
        </form>
        {isTyping && (
          <p className="absolute -top-8 left-4 bg-pup-50 text-bla-200 py-1 px-4 rounded-xl">
            {selectedConversation.userName} is typing...
          </p>
        )}
      </section>
    </article>
  ) : (
    <NotSelected />
  );
}

function Header({ conversation }: { conversation: any }) {
  return (
    <article className="flex justify-between items-center pb-2">
      <article className="flex gap-4 items-center text-pup-50 ">
        <section className="avatar online">
          <div className="w-14 rounded-full">
            <img src={conversation.profilePic} />
          </div>
        </section>
        <section className="text-sm">
          <p className="font-semibold text-base">
            {conversation.firstName
              ? `${conversation.firstName + " " + conversation.lastName}`
              : conversation.name}
          </p>
          <p>@{conversation.email}</p>
        </section>
      </article>
    </article>
  );
}
