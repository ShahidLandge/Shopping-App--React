import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

export const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  console.log(cart);
  console.log(cart[0]);

  //Delete item from cart
  const handleDelete = (ele) => {
    const filter = cart.filter((item) => {
      return ele[0].id !== item[0].id;
    });
    console.log(filter);
    setCart(filter);
  };

  //Total amount in the cart
  const totalPrice = cart.reduce((acc, curr) => {
    // console.log(curr[0])
    acc = acc + curr[0].price;
    return acc;
  }, 0);

  return (
    <>
      <br />
      <h2>My Cart</h2>
      <br />

      {cart.length !== 0 ? (
        <>
          {" "}
          <button className="filterButton">
            Items in the cart- {cart.length}
          </button>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Serial NO. </h3>{" "}
                </th>
                <th>
                  <h3>Title</h3>
                </th>
                <th>
                  <h3>Image</h3>
                </th>
                <th>
                  <h3>Price</h3>
                </th>
                <th>
                  <h3>Remove</h3>
                </th>
              </tr>
            </thead>
            {cart.map((ele, index) => {
              return (
                <tbody key={ele[0].id}>
                  <tr>
                    <td> {index + 1}</td>

                    <td>
                      <h4> {ele[0].title}</h4>
                    </td>
                    <td>
                      <img
                        src={ele[0].image}
                        alt="pic not found"
                        width="50px"
                      />
                    </td>
                    <td> $ {ele[0].price}</td>
                    <td>
                      {" "}
                      <button
                        className="filterButton"
                        onClick={(event) => handleDelete(ele)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <hr />
          <br />
          <br />
          <div className="cartButton">
            <button className="filterButton">
              Total amount- $ {totalPrice.toFixed(3)}
            </button>
            <button className="filterButton">Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <>
          <br />
          <h2>No Items in the cart </h2>
          <button
            className="filterButton"
            onClick={() => navigate("/products")}
          >
            Purchase Now
          </button>
        </>
      )}
    </>
  );
};

export default Cart;
