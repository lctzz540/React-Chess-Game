import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import React from "react";
import useWebSocket from "../hooks/useWebSocket";

interface Move {
  from: string;
  to: string;
  white: boolean;
}

interface Props {
  roomID: string;
}

const ChessGame: React.FC<Props> = ({ roomID }) => {
  const [chess] = React.useState<any>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const sendMessage = useWebSocket("ws://localhost:3000/ws/" + roomID);

  const [fen, setFen] = React.useState(chess.fen());

  const handleMove = (move: Move) => {
    try {
      if (chess.move(move, { promotion: "q" })) {
        sendMessage(move);
        setTimeout(() => {
          const moves = chess.moves({ verbose: true });
          if (moves.length > 0) {
            const computerMoveIndex = Math.floor(Math.random() * moves.length);
            const computerMove: Move = {
              from: moves[computerMoveIndex].from,
              to: moves[computerMoveIndex].to,
              white: false,
            };
            chess.move(computerMove);
            sendMessage(computerMove);
            setFen(chess.fen());
          }
        }, 300);
      }
      setFen(chess.fen());
    } catch (error) {
      return;
    }
  };

  return (
    <div className="flex-center">
      <div>Room ID: {roomID}</div>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            white: true,
          })
        }
      />
    </div>
  );
};

export default ChessGame;
