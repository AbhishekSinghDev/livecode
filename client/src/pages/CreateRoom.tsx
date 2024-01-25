import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import logo from "/public/logo-main.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();

  const [uniqueRoomId, setUniqueRoomId] = useState<string | undefined>(
    undefined
  );
  const [username, setUsername] = useState<string | undefined>(undefined);

  const createNewRoom = async () => {
    const roomId = uuidV4();
    setUniqueRoomId(roomId);

    toast.success("New room created");
  };

  const joinRoom = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (username === undefined && uniqueRoomId === undefined) {
      toast.error("Room ID and Username is compulsory");
      return;
    }

    navigate(`/editor/${uniqueRoomId}`, {
      state: {
        username,
        uniqueRoomId,
      },
    });
  };

  return (
    <section className="max-w-screen-xl mx-auto grid place-items-center sm:h-[85vh] h-[80vh]">
      <Card className="md:w-[50vw]">
        <CardHeader>
          <CardTitle>
            <span className="flex items-center justify-start gap-2">
              <img src={logo} alt="livecode logo" height={40} width={40} />

              <p className="flex flex-col justify-center">
                Livecode
                <span className="text-sm text-muted-foreground dark:text-green-600">
                  Realtime collaboration
                </span>
              </p>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="mt-4">Paste invitation ROOM ID</Label>
          <form className="flex flex-col gap-4 mt-2">
            <Input
              placeholder="ROOM ID"
              className="placeholder:font-semibold"
              value={uniqueRoomId}
              onChange={(e) => {
                setUniqueRoomId(e.target.value);
              }}
            />
            <Input
              placeholder="USERNAME"
              className="placeholder:font-semibold"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <Button onClick={joinRoom} type="submit">
              Join
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            If you don&apos;t have invite then create{" "}
            <span
              className="text-green-600 font-semibold underline underline-offset-2 cursor-pointer"
              onClick={createNewRoom}
            >
              new room
            </span>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CreateRoom;
