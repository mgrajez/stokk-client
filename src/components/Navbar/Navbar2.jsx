import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StokkLogo from "../../assets/StokkLogo.png";
import { AuthContext } from "../../context/auth.context";
import "../Navbar/Navbar2.css";

function Navbar2() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="nav-links">
            <Link className="hover-underline" to="/">
              {" "}
              Home{" "}
            </Link>
            <Link className="hover-underline" to="/photos/add">
              {" "}
              Add photo{" "}
            </Link>
            <Link className="hover-underline" to="/myaccount">
              {" "}
              My Account{" "}
            </Link>
            {isLoggedIn && (
              <>
                <a className="hover-underline" href="/" onClick={logOutUser}>
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
        <div className="logo">
          <Link to="/">
            <img
              className="stokk-logo"
              src={StokkLogo}
              alt="Stokk logo"
              width="300"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar2;
