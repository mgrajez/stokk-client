import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPhoto from "./pages/AddPhoto";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/photos/add"> Add a photo </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photos/add" element={<AddPhoto />} />
      </Routes>
    </div>
  );
}

export default App;
