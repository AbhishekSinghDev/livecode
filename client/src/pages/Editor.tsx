import Ide from "@/components/shared/Playground";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import logo from "/public/logo-main.svg";
import { Separator } from "@/components/ui/separator";

import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

interface ConnectedUsersInterface {
  sockedId: number;
  username: string;
}

const Editor: React.FC = () => {
  const [connectedUsers, setConnectedUsers] = useState<
    Array<ConnectedUsersInterface>
  >([
    { sockedId: 1, username: "Abhishek" },
    { sockedId: 2, username: "Siyan" },
  ]);
  const location = useLocation();

  const copyRoomId = () => {
    const roomid = location.state.uniqueRoomId;
    navigator.clipboard.writeText(roomid);
    toast.success("Room Id copied");
  };

  return (
    <section className="max-w-screen-2xl mx-auto my-6">
      <div className="grid md:grid-cols-5 grid-rows-5 w-full gap-6">
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

            <div className="flex items-start gap-4 mt-4">
              {connectedUsers.map((user: ConnectedUsersInterface) => (
                <UserAvatar username={user.username} key={user.sockedId} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={copyRoomId}>Copy Room ID</Button>
            <Button variant="destructive">Leave Room</Button>
          </div>
        </div>

        <div className="col-span-4 md:-order-1 -order-1">
          <Ide />
        </div>
      </div>
    </section>
  );
};

export default Editor;
