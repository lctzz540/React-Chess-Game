import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import React from "react";
import useWebSocket from "../hooks/useWebSocket";

interface Move {
  from: string;
  to: string;
}

const ChessGame: React.FC = () => {
  const [chess] = React.useState<any>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const sendMessage = useWebSocket("ws://localhost:3000/ws/100");

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
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
          })
        }
      />
    </div>
  );
};

export default ChessGame;
