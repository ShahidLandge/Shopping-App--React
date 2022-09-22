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
import { useEffect, useState } from "react";
import React from "react";
import Cart from "./Component/Pages/Cart";
import { CartProvider } from "./Component/Pages/CartContext";
import Alert from "./Component/Pages/Alert";

function App() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify([]));
    return () => {
      localStorage.clear();
    };
  }, []);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 800);
  };

  return (
    <AuthContext>
      <div className="App">
        <CartProvider>
          <Header />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/products"
              element={<Products showAlert={showAlert} />}
            />
            <Route
              path="/cart"
              element={
                <RequireLogin>
                  <Cart />
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

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </CartProvider>
      </div>
    </AuthContext>
  );
}

export default App;
