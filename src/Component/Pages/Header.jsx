import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../AuthContext";

export const Header = () => {
  const loggedInUser = useContext(UserContext);
  return (
    <>
      <header className="header">
        <ul className="nav">
          <li>
        
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
          <NavLink to="/cart">Cart</NavLink>
          </li>

          {loggedInUser.user.username ? (
            <div className="white">Welcome {loggedInUser.user.username}</div>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </header>
    </>
  );
};






