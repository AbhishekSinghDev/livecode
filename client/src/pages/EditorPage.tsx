import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import logo from "/public/logo-main.svg";
import { Separator } from "@/components/ui/separator";

import { useLocation, useNavigate, Navigate } from "react-router-dom";
import SelectLanguages from "@/components/shared/SelectLanguages";
import languages from "@/lib/languages";

import Editor from "@monaco-editor/react";
import initializeSocketConnection from "@/socket";
import ACTIONS from "@/lib/actions";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

export interface ConnectedUsersInterface {
  socketId: string;
  username: string;
}

const EditorPage: React.FC = () => {
  const [socketConnection, setSocketConnection] = useState<Socket>();

  const [connectedUsers, setConnectedUsers] = useState<
    Array<ConnectedUsersInterface>
  >([{ socketId: "", username: "" }]);
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();
  const Location = useLocation();
  const roomid = Location.state?.uniqueRoomId;
  const joiningUser = Location.state?.username;

  useEffect(() => {
    const init = async () => {
      const socket = await initializeSocketConnection();
      setSocketConnection(socket);
      // error handlers for socket
      socket.on("connect_error", (err) => errorHandler(err));
      socket.on("connect_failed", (err) => errorHandler(err));

      socket.emit(ACTIONS.JOIN, {
        roomId: roomid,
        username: joiningUser,
      });

      socket.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (joiningUser !== username) {
          toast.success(`${username} joined the room`);
        }

        setConnectedUsers(clients);
      });

      socket.on(ACTIONS.SYNC_CODE, ({ code }) => {
        setCode(code);
      });

      socket.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        setConnectedUsers((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );

        toast.success(`${username} left the room`);
      });
    };

    init();
  }, []);

  const copyRoomId = () => {
    const roomid = Location.state.uniqueRoomId;
    navigator.clipboard.writeText(roomid);
    toast.success("Room id copied");
  };

  const leaveRoom = () => {
    socketConnection?.off(ACTIONS.CODE_CHANGE);
    navigate("/");
    location.reload();
  };

  const errorHandler = (e: Error | unknown) => {
    console.log("socket", e);
    toast.error("Error while connecting to socket, Try again later");
    navigate("/");
  };

  const handleChangeinCode = async (value?: string) => {
    if (value) setCode(value);

    if (socketConnection) {
      socketConnection.emit(ACTIONS.CODE_CHANGE, {
        roomId: roomid,
        code: value,
      });

      socketConnection.on(ACTIONS.CODE_CHANGE, ({ code: codeFromServer }) => {
        console.log("changing code state");

        setCode(codeFromServer);
        console.log(codeFromServer);
      });
    }
  };

  if (!roomid || !joiningUser) {
    <Navigate to="/" />;
  }

  return (
    <section className="max-w-screen-2xl mx-auto my-6">
      <div className="grid md:grid-cols-5 w-full gap-6">
        <div className="col-span-1 flex gap-4 flex-col justify-between md:order-1 order-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center text-2xl gap-2">
              <img src={logo} alt="livecode logo" height={40} width={40} />
              <span className="font-mono font-semibold">Livecode</span>
            </div>

            <Separator />

            <p className="font-poppins text-xl font-semibold">
              Connected Users
            </p>

            <div className="grid grid-cols-3 gap-4">
              {connectedUsers.map((user) => (
                <UserAvatar username={user.username} key={user.socketId} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={copyRoomId}>Copy Room ID</Button>
            <Button variant="destructive" onClick={leaveRoom}>
              Leave Room
            </Button>
          </div>
        </div>

        <div className="col-span-4 md:-order-1 -order-1">
          <div>
            <div className="flex flex-col justify-center gap-1 my-2">
              <p className="text-medium font-semibold">Choose Language</p>
              <SelectLanguages languages={languages} />
            </div>
            <div>
              <Editor
                height="70vh"
                defaultLanguage="javascript"
                defaultValue="// write your code here"
                theme="vs-dark"
                options={{
                  fontSize: 18,
                  fontFamily: "monospace",
                  minimap: {
                    enabled: true,
                  },
                  contextmenu: true,
                }}
                onChange={handleChangeinCode}
                value={code}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorPage;
