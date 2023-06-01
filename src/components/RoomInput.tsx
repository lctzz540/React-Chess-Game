import React, { useState, ChangeEvent, FormEvent } from "react";

interface RoomInputProps {
  onJoin: (roomId: string) => void;
}

const RoomInput: React.FC<RoomInputProps> = ({ onJoin }) => {
  const [roomId, setRoomId] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomId.trim() !== "") {
      onJoin(roomId);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter room ID"
        value={roomId}
        onChange={handleChange}
      />
      <button type="submit">Join Room</button>
    </form>
  );
};

export default RoomInput;
