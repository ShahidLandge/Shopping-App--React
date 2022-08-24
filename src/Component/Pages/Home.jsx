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
            <h3 className="btn primary-button">
              Hello {loggedInUser.user.username} Enjoy Shopping
            </h3>
          ) : (
            <button
              className="btn primary-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {!loggedInUser.user.username && (
            <button
              className="btn primary-button"
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
