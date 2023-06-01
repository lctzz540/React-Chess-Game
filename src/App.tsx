import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ChessRoom from "./pages/ChessRoom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<ChessRoom />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
