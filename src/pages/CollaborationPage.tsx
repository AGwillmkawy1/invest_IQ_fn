import Chat from "../components/collaboration/Chat";
import Menu from "../components/collaboration/Menu";
import { SocketContextProvider } from "../context/SocketContext";
import ConversationContextProvider from "../context/useConversation";

export default function CollaborationPage() {
  return (
    <SocketContextProvider>
      <ConversationContextProvider>
        <article className="flex justify-between gap-6  h-[85vh] p-6">
          <section className="w-2/5 h-full bg-white border-2 border-mainGreen">
            <Menu />
          </section>
          <section className="w-3/5 h-full bg-white">
            <Chat />
          </section>
        </article>
      </ConversationContextProvider>
    </SocketContextProvider>
  );
}
