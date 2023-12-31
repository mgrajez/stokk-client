import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPhoto from "./pages/AddPhoto";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyAccountPage from "./pages/MyAccountPage";
import ErrorPage from "./pages/ErrorPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
