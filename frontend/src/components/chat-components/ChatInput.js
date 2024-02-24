import React, { useState } from "react";

const ChatInput = () => {
  const [textarea, setTextArea] = useState("");
  return (
    <div className="px-5 flex flex-col ">
      <textarea
        className="border border-slate-500 rounded-md outline-none p-1"
        value={textarea}
        placeholder="Type your message here.."
        onChange={(event) => {
          setTextArea(event.target.value);
        }}
      ></textarea>
      <div className="pt-2 w-full justify-center flex">
        <button className="p-1 border border-white bg-sky-600 text-white rounded-md hover:bg-white hover:text-sky-600 hover:border-sky-600 w-48 font-semibold">
          Send message
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
