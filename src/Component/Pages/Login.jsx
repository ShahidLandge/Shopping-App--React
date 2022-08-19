import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../AuthContext";

export const Login = () => {
  const loggedInuser = useContext(UserContext);
  const navigate = useNavigate();
  const [usernotfound, setUserNotFound] = useState(false);
  const [passwordNotMatch, setpasswordNotMatch] = useState(false);
  const location = useLocation();
  const [userInfo, setUserName] = useState({
    username: "",
    password: "",
  
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userList = JSON.parse(localStorage.getItem("users"));
    console.log(userList)
    const userfromStorage = userList.find((user) => {
      return user.firstname === userInfo.username;
    });
    // let path;
    // if(location.state.previousPath){
    //     path = location.state.previousPath
    // } else{
    //     path = '/'
    // }
    // console.log(loggedInuser.user)
    console.log(userfromStorage)
    if (userfromStorage) {
      if (userfromStorage.password === userInfo.password) {
     
        loggedInuser.setUser(userInfo);
        // console.log(loggedInuser.user.userInfo)
        console.log(location)
        navigate(location.state?.previousPath || "/");
        // navigate(path)
      } else {
        setpasswordNotMatch(true);
      }
    } else {
      setUserNotFound(true);
    }
  };

  return (
    <>
      <h2>Login  or  Sign up</h2>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="username">UserName</label>
        <input
          id="username"
          type="text"
          onChange={(e) =>
            setUserName({ ...userInfo, username: e.target.value })
          }
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          onChange={(e) =>
            setUserName({ ...userInfo, password: e.target.value })
          }
        />
        <br />
        <br />
        <button className="filterButton">Login</button>             
        <button className="filterButton" onClick={() => navigate("/signup")}>Sign up</button>
      </form>
      <br />
      {usernotfound && (
        <>
          <h3>You are not an existing user. please signup first</h3>
          <br />
      
        </>
      )}
      {passwordNotMatch && (
        <>
          <h3>Your password is incorrect, please try again</h3>
        </>
      )}
    </>
  );
};
