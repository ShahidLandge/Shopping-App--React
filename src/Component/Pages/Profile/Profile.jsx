import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../../AuthContext";

export const Profile = () => {
  const loggedInUser = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    loggedInUser.setUser({});
    navigate("/");
  };
  return (
    <>
      <h2>Profile Page</h2>
      <br />
      <h3>Name: {loggedInUser.user.username}</h3>
      <br />

      {/*   
    <Link to='myaddress'>My Address</Link>
    <Link to='mywallet'>My Wallet</Link> */}

      <button
        className="filterButton primary-button"
        onClick={() => navigate("myaddress")}
      >
        My Address
      </button>
      <br />

      <button
        className="filterButton primary-button"
        onClick={() => navigate("myorders")}
      >
        My Orders
      </button>
      <br />

      <button
        className="filterButton primary-button"
        onClick={() => navigate("mywallet")}
      >
        My Wallet
      </button>
      <br />

      <button
        className="filterButton primary-button"
        onClick={() => navigate("/products")}
      >
        Products
      </button>
      <br />

      <button
        className="filterButton primary-button"
        onClick={() => navigate("/")}
      >
        Go to home
      </button>
      <br />

      <button className="filterButton primary-button" onClick={logout}>
        Logout
      </button>
      <br />
      <br />
      <Outlet />
    </>
  );
};
