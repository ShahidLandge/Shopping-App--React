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
      <br />
      <h5>Name: {loggedInUser.user.username}</h5>
      

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
        onClick={() => navigate("/cart")}
      >
        Go to Cart
      </button>
      <br />

      <button
        className="filterButton primary-button"
        onClick={() => navigate("/products")}
      >
        Go to Products
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
