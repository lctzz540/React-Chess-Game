import React from "react";
import { useParams } from "react-router-dom";
import ChessGame from "../components/ChessGame";

const ChessRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return id ? <ChessGame roomID={id} /> : null;
};

export default ChessRoom;
