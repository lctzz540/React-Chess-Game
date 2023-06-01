import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== "") {
      navigate(`/${roomId}`);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        value={roomId}
        onChange={handleRoomIdChange}
        placeholder="Enter Room ID"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default HomePage;
