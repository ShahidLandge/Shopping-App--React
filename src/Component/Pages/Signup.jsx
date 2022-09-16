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
      <h2 className="formHeader">Sign up</h2>
      <br />
      <br />

      <form className="form" onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            value={signUpValidation.firstname}
            onChange={(e) => handleUserInputChange(e)}
          />
          <div>{signUpValidationerror.firstnameError}</div>
        </div>
        <br />

        <div>
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            value={signUpValidation.lastname}
            onChange={(e) => handleUserInputChange(e)}
          />
          <div>{signUpValidationerror.lastnameError}</div>
        </div>
        <br />

        <div>
          <input
            type="text"
            id="email"
            placeholder="Email Id"
            value={signUpValidation.email}
            onChange={(e) => handleUserInputChange(e)}
          />
          <div>{signUpValidationerror.emailError}</div>
        </div>
        <br />

        <div>
          <input
            type="text"
            id="password"
            placeholder="Password"
            value={signUpValidation.password}
            onChange={(e) => handleUserInputChange(e)}
          />
          <div>{signUpValidationerror.passwordError}</div>
        </div>
        <br />

        <div>
          <input
            type="text"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={signUpValidation.confirmPassword}
            onChange={(e) => handleUserInputChange(e)}
          />
          <div>{signUpValidationerror.confirmPasswordError}</div>
        </div>
        <br />

        <button className="filterButton primary-button">Sign up</button>
      </form>
    </>
  );
};
