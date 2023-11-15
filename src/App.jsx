import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PhotoPage from "./pages/PhotoPage";
import AddPhoto from "./pages/AddPhoto";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyAccountPage from "./pages/MyAccountPage";
import ErrorPage from "./pages/ErrorPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Navbar2 from "./components/Navbar/Navbar2";
import "./App.css";

function App() {
  return (
    <>
      <Navbar2 />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" />
          <Route path="/photos/:photoId" element={<PhotoPage />} />
          <Route
            path="/photos/add"
            element={
              <IsPrivate>
                {" "}
                <AddPhoto />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/signup"
            element={
              <IsAnon>
                {" "}
                <SignupPage />{" "}
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                {" "}
                <LoginPage />{" "}
              </IsAnon>
            }
          />
          <Route
            path="/myaccount"
            element={
              <IsPrivate>
                {" "}
                <MyAccountPage />{" "}
              </IsPrivate>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
