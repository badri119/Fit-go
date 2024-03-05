import React from "react";
import ChatHeader from "./chat-components/ChatHeader";
import Matches from "./chat-components/Matches";
import ChatDisplay from "./chat-components/ChatDisplay";

const Chat = () => {
  return (
    <div className="bg-white shadow-lg shadow-sky-600 w-1/3 z-10">
      <ChatHeader />
      <div>
        <button className="border-b-4 border-sky-600 text-md m-0.5 p-2.5 disabled:border-b-4 disabled:border-slate-600">
          Matches
        </button>
        <button className="border-b-4 border-sky-600 text-md m-0.5 p-2.5 disabled:border-b-4 disabled:border-slate-600">
          Chat
        </button>
        <button className="border-b-4 border-sky-600 text-md m-0.5 p-2.5 disabled:border-b-4 disabled:border-slate-600">
          <a
            href="https://snapchat-clone-934c7.web.app/"
            target="_blank"
            rel="noreferrer"
          >
            Snap a Friend
          </a>
        </button>
      </div>
      <Matches />
      <ChatDisplay />
    </div>
  );
};

export default Chat;
