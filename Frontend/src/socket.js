import { io } from "socket.io-client";

const socket = io("https://real-time-chat-app-3-axa5.onrender.com", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default socket;
