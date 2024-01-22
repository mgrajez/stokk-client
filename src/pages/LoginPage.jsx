import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "./../services/service";
import "../pages/LoginPage.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    service
      .post(`/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="login-page">
        <div className="form-container">
          <h1>Login</h1>

          <form className="form" onSubmit={handleLoginSubmit}>
            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />

            <label className="form-label">Password:</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />

            <button className="form-submit" type="submit">
              Login
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Don't have an account yet?</p>
          <Link to={"/signup"}> Sign Up</Link>
        </div>
      </div>
      <div className="test-account">
        <p>
          <span className="test-font">Email:</span> test.account@test.com <br />{" "}
          <span className="test-font">Password:</span> Test.Account.1
        </p>
      </div>
    </>
  );
}

export default LoginPage;
