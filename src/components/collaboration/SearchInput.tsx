import { useState } from "react";
import toast from "react-hot-toast";
import { useConversationContext } from "../../context/useConversation";
import useGetConversation from "../../hooks/collaboration/useGetConversations";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const { setSelectedConversation } = useConversationContext();
  const { conversations } = useGetConversation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    if (query.length < 3) {
      toast.error("Search Must be at least 3 characters long");
      return;
    }
    const conversation = conversations.find((c) =>
      c.names.toLowerCase().includes(query.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setQuery("");
    } else {
      toast.error("No such user found!");
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>
    </section>
  );
}
