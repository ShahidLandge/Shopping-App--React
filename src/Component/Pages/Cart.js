import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

export const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  console.log(cart);
  console.log(cart[0]);

  //Delete item from cart
  const handleDelete = (ele, index) => {
    const filter = cart.filter((item, idx) => {
      return index !== idx;
    });
    console.log(filter);
    setCart(filter);
  };

  // const handleDelete= (ele,index)=>{
  //   const item = cart.find((c)=>c[0].id === ele[0].id);
  //   console.log(item);
  //   const idx = cart.indexOf(item);
  //   cart.splice(idx,1)
  // }

  //Total amount in the cart
  const totalPrice = cart.reduce((acc, curr) => {
    // console.log(curr[0])
    acc = acc + curr[0].price;
    return acc;
  }, 0);

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <br />
      <h3>My Cart</h3>

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
                  <h6>Sr No. </h6>
                </th>
                <th>
                  <h6>Title</h6>
                </th>
                <th>
                  <h6>Image</h6>
                </th>
                <th>
                  <h6>Price</h6>
                </th>
                <th>
                  <button
                    className="filterButton btnCart"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </button>
                </th>
              </tr>
            </thead>
            {cart.map((ele, index) => {
              return (
                <tbody key={ele[0].id}>
                  <tr>
                    <td> {index + 1}</td>

                    <td className="itemTitle">{ele[0].title}</td>
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
                        className="filterButton btnCart"
                        onClick={(event) => handleDelete(ele, index)}
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
