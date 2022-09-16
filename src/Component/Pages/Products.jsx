import React, { useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { CartContext } from "./CartContext";
import  {DebounceInput} from  "react-debounce-input"
import { UserContext } from "../../AuthContext";

export const Products = (props) => {
  // 1. Make an api call to the url: "https://fakestoreapi.com/products" to fetch a list of products
  // 2. Render the products (name,image and price)

  let [product, setproduct] = useState([]);
  const [inputchange, setinputChange] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useContext(CartContext);
  const loggedInUser = useContext(UserContext);

  // console.log(cart);

  //add to cart
  const addToCart = (ele) => {
    const filter = product.filter((item) => {
      return ele.id === item.id;
    });

    setCart([...cart, filter]);
    props.showAlert("Added to cart", "success");
    console.log(props.showAlert);
  };



  const handleChange=(value)=>{
    console.log(value);
    // console.log(product);
    // console.log(product.length);
    if (product.length !== 0){
    let filter= product.filter((item) =>
           item.title.toLowerCase().includes(value.toLowerCase())
       );
       console.log(filter.length);
       if(filter.length !== 0)
       setproduct(filter)
      else{
    
          setLoading(true);
          fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((data) => {
            setLoading(false)
             console.log(data)
             let filter= data.filter((item) =>
             item.title.toLowerCase().includes(value.toLowerCase())
         );
              return 
              ( setproduct(filter));
            })
            .catch((e) => {
              setLoading(false);
              console.log(e.message);
            });
  
       }
     
   }

  }

 
   //search bar . searching while user types in search bar.
  product = !inputchange
    ? product
    : product.filter((item) =>
        item.title.toLowerCase().includes(inputchange.toLowerCase())
      );

  //search on button click
  function searchProduct() {
    console.log("btn clicked");
    product = !inputchange
      ? product
      : product.filter((item) =>
          item.title.toLowerCase().includes(inputchange.toLowerCase())
        );
    if (product.length !== 0) setproduct(product);
    else {
      console.log("product not found");
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        return setLoading(false), console.log(data), setproduct(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, []);
  function lowToHigh() {
    let sort = product.sort((a, b) => a.price - b.price);
    let filter = sort.filter((item) => item.price);
    setproduct(filter);
  }
  function highToLow() {
    let sort = product.sort((a, b) => b.price - a.price);
    let filter = sort.filter((item) => item.price);
    setproduct(filter);
  }

  return (
    <div>
      <br />
      <h2>Buy Now</h2>
      <br />
      <DebounceInput
      minLength={4}
        placeholder="Search Product"
        debounceTimeout={1000}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="filterButton" onClick={() => searchProduct()}>
        Search
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
                <h6>Id </h6>
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
                <h6>Cart</h6>
              </th>
            </tr>
          </thead>
          {product.map((ele) => {
            return (
              <tbody key={ele.id}>
                <tr>
                  <td> {ele.id}</td>
                  <td className="itemTitle">{ele.title}</td>
                  <td>
                    {" "}
                    <img src={ele.image} alt="pic not found" width="100px" />
                  </td>
                  <td> $ {ele.price}</td>
                  <td>
                  {loggedInUser.user.username ?
                    <button
                      className="filterButton btnCart"
                      onClick={() => addToCart(ele)}
                    >
                      Add to Cart
                    </button> :   <button
                      className="filterButton btnCart"
                      onClick={() =>navigate('/login')}
                    >
                      Add to Cart
                    </button>
          }
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
