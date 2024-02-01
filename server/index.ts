import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import ACTIONS from "./constants/actions";

const PORT = process.env.PORT || 4000;
const app = express();

const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get("/", (req, res) => {
  res.send("server running");
});

const clientUrl = process.env.DEPLOYED_CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: clientUrl,
  },
});

const userSocketMap: any = {};
let codeCacheMap: any = {};

const getAllUserInRoom = (roomId: string) => {
  // return type of rooms adapter is map so converted to array using Array.from
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (user) => {
  user.on(ACTIONS.JOIN, (data) => {
    const username = data.username;
    const roomId = data.roomId;

    userSocketMap[user.id] = username;
    user.join(roomId);
    const clients = getAllUserInRoom(roomId);

    for (let i = 0; i < 1; i++) {
      console.log(codeCacheMap[roomId]);

      io.to(user.id).emit(ACTIONS.SYNC_CODE, { code: codeCacheMap[roomId] });
    }

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: user.id,
      });
    });
  });

  user.on("disconnecting", () => {
    const rooms = [...user.rooms];
    rooms.forEach((roomId) => {
      user.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: user.id,
        username: userSocketMap[user.id],
      });
    });

    delete userSocketMap[user.id];
    user.leave(user.id);
  });

  user.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    codeCacheMap[roomId] = code;
    user.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });
});
