import "./App.css";
import ChessGame from "./components/ChessGame";
import WebSocketTest from "./components/WebSocket";

const App: React.FC = () => {
  return (
    <div className="flex-center">
      <ChessGame />
      <WebSocketTest />
    </div>
  );
};

export default App;
