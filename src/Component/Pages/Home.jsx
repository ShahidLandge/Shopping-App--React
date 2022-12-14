import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../AuthContext";
import image from "./Image/main.jpg";

export const Home = () => {
  const loggedInUser = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg" style={{ backgroundImage: `url(${image})` }}>
        <div className="homeBtns">
          <br />
          {loggedInUser.user.username ? (
            <h3 className="btn btn-primary">
              Hello {loggedInUser.user.username} Enjoy Shopping
            </h3>
          ) : (
            <button
              className="btn btn-warning primary-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
           
           {/* After signup hide signup button , password is common in both login and signup. */}
          {!loggedInUser.user.password && (
            <button
              className="btn btn-warning primary-button"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </>
  );
};
