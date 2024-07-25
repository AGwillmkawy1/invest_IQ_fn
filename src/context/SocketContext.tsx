import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

interface SocketContextProps {
  socket: any;
  onlineUsers: any[];
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
});

export const SocketContextProvider = ({ children }: { children: any }) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userInfo } = useAuthContext();

  useEffect(() => {
    if (userInfo) {
      let socket = io("http://127.0.0.1:5000", {
        query: {
          userId: userInfo.id,
        },
      });

      setSocket(socket);

      socket.on("all_my_msg", (users) => {
        setOnlineUsers(users);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
