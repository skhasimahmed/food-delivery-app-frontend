import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken, setCartItems } =
    useContext(StoreContext);

  const [menu, setMenu] = useState("home");

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setCartItems({});
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#mobile-app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#contact-us"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" title="Search" />
        <div className="navbar-basket-icon">
          <Link
            onClick={(e) => {
              e.preventDefault();
              if (!token) {
                setShowLogin(true);
                toast.error("Please login to view cart");
                return false;
              } else navigate("/cart");
            }}
          >
            <img src={assets.basket_icon} alt="Basket Icon" title="Cart" />
          </Link>

          {getTotalCartAmount() > 0 ? <div className="dot"></div> : null}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className="navbar-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="Bag Icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};
