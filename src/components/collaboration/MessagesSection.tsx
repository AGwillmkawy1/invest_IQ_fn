import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessagesSection({ messages }: { messages: any }) {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      (lastMessageRef.current as unknown as HTMLElement)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, [messages]);

  return (
    <section className="w-full h-[80%] max-h-[80%] px-10 md:px-6 sm:px-2 overflow-y-auto custom-scroller ">
      {messages.map((message: any, ind: number) => (
        <div key={ind} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
    </section>
  );
}
