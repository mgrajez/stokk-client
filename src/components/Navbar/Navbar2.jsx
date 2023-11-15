import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StokkLogo from "../../assets/StokkLogo.png";
import { AuthContext } from "../../context/auth.context";

function Navbar2() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <div>
        <Link to="/"> Home </Link>
        <Link to="/photos/add"> Add photo </Link>
        <Link to="/myaccount"> My Account </Link>
        {isLoggedIn && (
          <>
            <a href="/" onClick={logOutUser}>
              Logout
            </a>
          </>
        )}
      </div>
      <div>
        <Link to="/">
          <img src={StokkLogo} alt="Stokk logo" width="300" />
        </Link>
      </div>
    </>
  );
}

export default Navbar2;
