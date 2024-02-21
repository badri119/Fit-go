import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const ChatHeader = () => {
  return (
    <div className="bg-gradient-to-r from-sky-600 to-sky-200 h-24 flex justify-between items-center">
      <div className="">
        <div className="pl-2">
          <Avatar alt="Remy Sharp" src="https://i.imgur.com/oPj4A8u.jpg" />
        </div>
      </div>
      <Tooltip title="Click to Logout" placement="right" arrow>
        <LogoutIcon className="cursor-pointer" />
      </Tooltip>
    </div>
  );
};

export default ChatHeader;
