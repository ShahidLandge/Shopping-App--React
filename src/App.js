import "./App.css";
import { Home } from "./Component/Pages/Home";
import { Routes, Route } from "react-router-dom";
import { Products } from "./Component/Pages/Products";
import { Profile } from "./Component/Pages/Profile/Profile";
import { Header } from "./Component/Pages/Header";

import { MyOrders } from "./Component/Pages/Profile/MyOrders";
import { Login } from "./Component/Pages/Login";
import { Signup } from "./Component/Pages/Signup";
import { AuthContext } from "./AuthContext";
import { RequireLogin } from "./Component/Pages/RequireLogin";
import { useEffect } from "react";
import React from "react";
import Cart from "./Component/Pages/Cart";

function App() {
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify([]));
    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <AuthContext>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={
              <RequireLogin>
                <Products />
              </RequireLogin>
            }
          />

          <Route
            path="/profile"
            element={
              <RequireLogin>
                <Profile />
              </RequireLogin>
            }
          >
            <Route path="myaddress" element={<h3>My Address Data</h3>} />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="mywallet" element={<h3>My Wallet Data</h3>} />
          </Route>

          <Route
            path="/cart"
            element={
              <RequireLogin>
                <Cart />
              </RequireLogin>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </AuthContext>
  );
}

export default App;

