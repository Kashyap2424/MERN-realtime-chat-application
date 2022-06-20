import React, { useState, useEffect } from "react";

const Chats = ({ socket, userName, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessageHandler = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        authore: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div>
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessageHandler}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chats;
