import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useConversationContext } from "../../context/useConversation";
import { useAuthContext } from "../../context/AuthContext";
dayjs.extend(relativeTime);

export default function Message({ message }: { message: any }) {
  const { userInfo: currentUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();

  const isUserSender = currentUser.id === message.senderId;
  const shouldShake = message.shouldShake ? true : false;

  return (
    <div
      className={`${
        isUserSender ? "chat-end" : "chat-start"
      } chat chat-start mb-4`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              isUserSender
                ? currentUser.profilePic
                : selectedConversation.profilePic
            }
          />
        </div>
      </div>
      {isUserSender ? (
        <div className="chat-header flex items-end gap-4 mb-2">
          <p className="text-xs opacity-50">
            {dayjs(message.createdAt).fromNow()}
          </p>
          <p className="font-semibold text-[17px]">
            {isUserSender ? currentUser.names : selectedConversation.firstName}
          </p>
        </div>
      ) : (
        <div className="chat-header flex items-end gap-4 mb-1">
          <p className="font-semibold text-[17px]">
            {isUserSender
              ? currentUser.names.split(" ")[0]
              : selectedConversation.firstName
              ? selectedConversation.firstName
              : selectedConversation.name}
          </p>
          <p className="text-xs opacity-50">
            {dayjs(message.createdAt).fromNow()}
          </p>
        </div>
      )}

      <div
        className={`${
          isUserSender ? "bg-mainGreen text-white" : "bg-gray-500"
        } chat-bubble text-white ${shouldShake ? "shake" : ""}`}
      >
        {message.message}
      </div>
    </div>
  );
}
