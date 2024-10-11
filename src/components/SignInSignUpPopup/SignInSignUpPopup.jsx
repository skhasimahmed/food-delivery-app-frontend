import { useContext, useState } from "react";
import "./SignInSignUpPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignInSignUpPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign In");
  const { API_BASE_URL, setToken, setCartItems, setIsAdmin, setAuthUser } =
    useContext(StoreContext);
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignInSignUp = async (e) => {
    setShowLoader(true);
    e.preventDefault();

    let apiUrl = API_BASE_URL + "api/user";

    if (currentState === "Sign Up") {
      apiUrl += "/register";
    } else {
      apiUrl += "/login";
    }

    await axios
      .post(`${apiUrl}`, data)
      .then((response) => {
        setShowLoader(false);
        if (response.data.success) {
          setToken(response.data.token);

          localStorage.setItem("token", response.data.token);

          setShowLogin(false);

          localStorage.setItem("authUser", JSON.stringify(response.data.user));

          setAuthUser(response.data.user);

          localStorage.setItem(
            "isAdmin",
            JSON.stringify(response.data.isAdmin)
          );

          setIsAdmin(response.data.isAdmin);

          setCartItems(response.data.cartData);

          toast.success(response.data.message);

          if (response.data.isAdmin) navigate("/admin/dashboard");
        } else toast.error(response.data.message);
      })
      .catch((err) => {
        setShowLoader(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="sign-in-sign-up-popup">
      <form
        className="sign-in-sign-up-popup-container"
        onSubmit={handleSignInSignUp}
      >
        <div className="sign-in-sign-up-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="Cross Icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="sign-in-sign-up-popup-inputs">
          {currentState === "Sign Up" ? (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              onChange={handleChange}
              value={data.name}
            />
          ) : null}

          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            onChange={handleChange}
            value={data.email}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={data.password}
          />
        </div>
        <button
          type="submit"
          disabled={showLoader}
          className={showLoader ? "disabled-button" : ""}
        >
          {currentState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>
        <div className="sign-in-sign-up-popup-terms-condition">
          <input type="checkbox" required defaultChecked />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currentState === "Sign Up" ? (
          <p onClick={() => setCurrentState("Sign In")}>
            Already have an account? <span>Login here</span>
          </p>
        ) : (
          <p onClick={() => setCurrentState("Sign Up")}>
            Do not have an account? <span>Register here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignInSignUpPopup;

SignInSignUpPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};
