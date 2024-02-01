import { io } from "socket.io-client";

const initializeSocketConnection = async () => {
  const SERVER_URL = process.env.SOCKET_SERVER_URL || "http://localhost:3000";
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(SERVER_URL, options);
};

export default initializeSocketConnection;
