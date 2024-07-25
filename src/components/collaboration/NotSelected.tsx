import { useAuthContext } from "../../context/AuthContext";

export default function NotSelected() {
  const { userInfo } = useAuthContext();
  return (
    <article className="w-full h-full flex flex-col justify-center items-center gap-6 text-pup-50">
      <div className="flex gap-5 items-center">
        <p className="font-semibold font-serif text-3xl">
          Collaboration Channel
        </p>
      </div>
      <p className="text-xl">Welcome {userInfo.names}😎</p>
      <p>
        Select a <span className="font-bold font-serif">Chat</span> to start
        messaging
      </p>
    </article>
  );
}
