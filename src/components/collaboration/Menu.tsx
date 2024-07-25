import Loading from "react-loading";
import User from "./User";
import SearchInput from "./SearchInput";
import useGetConversation from "../../hooks/collaboration/useGetConversations";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function Menu() {
  const { isLoading, conversations } = useGetConversation();
  const [convType, setConvType] = useState("investors");
  const { userInfo } = useAuthContext();

  const filteredConversations =
    convType === "investors" ? conversations.investors : conversations.startups;

  return (
    <article className="p-4 flex flex-col gap-4">
      <SearchInput />
      {isLoading ? (
        <div className="h-[70vh] grid place-content-center">
          <Loading
            height={60}
            width={60}
            type="spinningBubbles"
            color="#AFB3FF"
          />
        </div>
      ) : (
        <section className="h-[70vh]  w-full overflow-y-auto custom-scroller">
          <section className="flex justify-between">
            <button
              className={`w-1/2 grid place-content-center border-b-2 ${
                convType === "investors"
                  ? "border-mainGreen text-mainGreen"
                  : "border-gray-400 text-gray-400"
              }`}
              onClick={() => setConvType("investors")}
            >
              Investors
            </button>
            <button
              className={`w-1/2 grid place-content-center border-b-2 ${
                convType === "startups"
                  ? "border-mainGreen text-mainGreen"
                  : "border-gray-400 text-gray-400"
              }`}
              onClick={() => setConvType("startups")}
            >
              Startups
            </button>
          </section>
          {filteredConversations
            .filter((elt) => elt.id !== userInfo.id)
            .map((conv, ind) => (
              <User key={ind} conversation={conv} />
            ))}
        </section>
      )}
    </article>
  );
}
