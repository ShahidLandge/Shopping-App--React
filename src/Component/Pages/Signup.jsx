import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../AuthContext";

export const Signup = () => {
  const navigate = useNavigate();
  const loggedInuser = useContext(UserContext);

  const initialValue = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrorValue = {
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  };

  const [signUpValidation, setSignupValidation] = useState(initialValue);

  const [signUpValidationerror, setSignupValidationError] =
    useState(initialErrorValue);

  const userNameValidator = () => {
    if (signUpValidation.firstname === "") {
      setSignupValidationError({
        ...signUpValidationerror,
        firstnameError: "Please enter firstname",
      });
      return false;
    } else if (signUpValidation.lastname === "") {
      setSignupValidationError({
        ...signUpValidationerror,
        lastnameError: "Please enter lastname",
      });
      return false;
    } else {
      setSignupValidationError(initialErrorValue);
      return true;
    }
  };

  const emailValidator = () => {
    // should not be empty
    // min lemgth
    // should have @ symbol ---> searching

    if (signUpValidation.email === "") {
      setSignupValidationError({
        ...signUpValidationerror,
        emailError: "Please enter email",
      });
      return false;
    } else if (signUpValidation.email.length < 6) {
      setSignupValidationError({
        ...signUpValidationerror,
        emailError: "email must be atleast 6 characters",
      });
      return false;
    } else if (!signUpValidation.email.match(/@/)) {
      setSignupValidationError({
        ...signUpValidationerror,
        emailError: "email must contain @ symbol",
      });
      return false;
    } else {
      setSignupValidationError(initialErrorValue);
      return true;
    }
  };

  //password validator
  const passwordValidator = () => {
    if (signUpValidation.password === "") {
      setSignupValidationError({
        ...signUpValidationerror,
        passwordError: "Please enter password",
      });
      return false;
    } else if (signUpValidation.password.length < 6) {
      setSignupValidationError({
        ...signUpValidationerror,
        passwordError: "password must be atleast 6 characters",
      });
      return false;
    } else {
      setSignupValidationError(initialErrorValue);
      return true;
    }
  };
  //confirm password validator
  const confirmPasswordValidator = () => {
    if (signUpValidation.confirmPassword !== signUpValidation.password) {
      setSignupValidationError({
        ...signUpValidationerror,
        confirmPasswordError: " password do not match",
      });
      return false;
    } else {
      setSignupValidationError(initialErrorValue);
      return true;
    }
  };

  //Form submitting
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      userNameValidator() &&
      emailValidator() &&
      passwordValidator() &&
      confirmPasswordValidator()
    ) {
      loggedInuser.setUser(signUpValidation);
      const userList = JSON.parse(localStorage.getItem("users"));
      userList.push(signUpValidation);
      console.log(userList);
      localStorage.setItem("users", JSON.stringify(userList));

      console.log(loggedInuser.user);
      navigate("/");
    }
  };
  const handleUserInputChange = (e) => {
    setSignupValidation({ ...signUpValidation, [e.target.id]: e.target.value });
  };

  return (
    <>
      <h2>Sign up</h2>
      <br />
      <br />

      <form onSubmit={submitHandler}>
        <label htmlFor="firstname">First Name: </label>
        <input
          type="text"
          id="firstname"
          value={signUpValidation.firstname}
          onChange={(e) => handleUserInputChange(e)}
        />

        <div>{signUpValidationerror.firstnameError}</div>
        <br />
        <label htmlFor="lastname">Last Name: </label>
        <input
          type="text"
          id="lastname"
          value={signUpValidation.lastname}
          onChange={(e) => handleUserInputChange(e)}
        />

        <div>{signUpValidationerror.lastnameError}</div>
        <br />

        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          value={signUpValidation.email}
          onChange={(e) => handleUserInputChange(e)}
        />

        <div>{signUpValidationerror.emailError}</div>
        <br />

        <label htmlFor="password">Password: </label>
        <input
          type="text"
          id="password"
          value={signUpValidation.password}
          onChange={(e) => handleUserInputChange(e)}
        />

        <div>{signUpValidationerror.passwordError}</div>
        <br />

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="text"
          id="confirmPassword"
          value={signUpValidation.confirmPassword}
          onChange={(e) => handleUserInputChange(e)}
        />

        <div>{signUpValidationerror.confirmPasswordError}</div>
        <br />

        <button className="filterButton">Sign up</button>
      </form>
    </>
  );
};
