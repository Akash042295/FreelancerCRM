import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://mern-crm-eta.vercel.app",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online-users", Array.from(onlineUsers.keys()));
      // console.log(`${userId} joined`);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });

  return io;
};

export const getIO = () => io;

export const getOnlineUsers = () => onlineUsers;