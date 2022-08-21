import { useNavigate } from "react-router-dom";
import image from "./Image/main.jpg";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg" style={{ backgroundImage: `url(${image})` }}>
        <div className="homeBtns">
          <button
            className="btn primary-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn primary-button"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};
