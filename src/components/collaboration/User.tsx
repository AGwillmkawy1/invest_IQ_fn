import { useSocketContext } from "../../context/SocketContext";
import { useConversationContext } from "../../context/useConversation";

export default function User({ conversation }: { conversation: any }) {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation.id);

  const isSelected = selectedConversation?.id === conversation.id;

  return (
    <button
      onClick={() => setSelectedConversation(conversation)}
      className={`${
        isSelected ? "bg-mainGreen/30" : ""
      } flex justify-between items-center py-2 mb-2 border-b border-pup-100/10 hover:bg-mainGreen w-full px-4`}
    >
      <article className="flex gap-4 items-center text-pup-50 ">
        <section className={`${isOnline ? "online" : "offline"} avatar`}>
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
    </button>
  );
}
