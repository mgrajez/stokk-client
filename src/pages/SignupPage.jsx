import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "./../services/service";
import "../pages/SignupPage.css";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    service
      .post(`/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="signup-container">
        <div className="form-container">
          <h1>Sign Up</h1>

          <form className="form" onSubmit={handleSignupSubmit}>
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

            <label className="form-label">Username:</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={username}
              onChange={handleUsername}
            />

            <button className="form-submit" type="submit">
              Sign Up
            </button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link to={"/login"}> Login</Link>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
