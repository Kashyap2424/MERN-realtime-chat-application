import { useState } from "react";
import io from "socket.io-client";

import "./App.css";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinRoom = () => {
    if (userName !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
    }
  };

  return (
    <div className="App">
      <h3>Join a chat</h3>
      <input
        type="text"
        placeholder="Kashyap"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="room id..."
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />

      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default App;
