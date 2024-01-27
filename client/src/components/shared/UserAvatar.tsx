import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface UserAvatarProps {
  username: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ username }) => {
  return (
    <div className="flex flex-col line-clamp-1 h-18 w-18 items-center justify-center gap-1">
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-xs">{username}</span>
    </div>
  );
};

export default UserAvatar;
