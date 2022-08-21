import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";

export const Products = () => {
  // 1. Make an api call to the url: "https://fakestoreapi.com/products" to fetch a list of products
  // 2. Render the products (name,image and price)

  let [post, setpost] = useState([]);
  const [inputchange, setinputChange] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //search bar . searching while user types in search bar.
  post = !inputchange
    ? post
    : post.filter((item) =>
        item.title.toLowerCase().includes(inputchange.toLowerCase())
      );

  //search on button click
  function searchProduct() {
    console.log("btn clicked");
    post = !inputchange
      ? post
      : post.filter((item) =>
          item.title.toLowerCase().includes(inputchange.toLowerCase())
        );
    if (post.length !== 0) setpost(post);
    else {
      console.log("product not found");
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        return setLoading(false), console.log(data), setpost(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, []);
  function lowToHigh() {
    let sort = post.sort((a, b) => a.price - b.price);
    let filter = sort.filter((item) => item.price);
    setpost(filter);
  }
  function highToLow() {
    let sort = post.sort((a, b) => b.price - a.price);
    let filter = sort.filter((item) => item.price);
    setpost(filter);
  }

  return (
    <div className="App">
      <h2>Buy Now</h2>
      <br />
      <input
        placeholder="Search Product"
        onChange={(e) => setinputChange(e.target.value)}
      />
      <button className="filterButton" onClick={() => searchProduct()}>
        Fetch{" "}
      </button>
      <button className="filterButton" onClick={() => lowToHigh()}>
        Low-to-High Price{" "}
      </button>
      <button className="filterButton" onClick={() => highToLow()}>
        High-to-Low Price{" "}
      </button>
      <br />
      <br />
      <br />

      {loading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                <h3>Id </h3>{" "}
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
                <h3>Cart</h3>{" "}
              </th>
            </tr>
          </thead>
          {post.map((ele) => {
            return (
              <tbody key={ele.id}>
                <tr>
                  <td> {ele.id}</td>
                  <td>
                    <h4> {ele.title}</h4>
                  </td>
                  <td>
                    {" "}
                    <img src={ele.image} alt="pic not found" width="100px" />
                  </td>
                  <td> $ {ele.price}</td>
                  <td>
                    <button
                      className="filterButton btnCart"
                      onClick={() => navigate("/cart")}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </div>
  );
};
