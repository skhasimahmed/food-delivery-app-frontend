import { useContext, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import Avatar from "react-avatar";
const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const section = document.getElementById(hash.replace("#", ""));
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Trigger scroll if there's a hash when the component first loads
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const {
    getTotalCartAmount,
    token,
    setToken,
    setCartItems,
    authUser,
    setAuthUser,
    activeMenu,
    setActiveMenu,
  } = useContext(StoreContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");

    localStorage.removeItem("authUser");
    setAuthUser(null);

    setCartItems({});
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/foods#search-container");
    // setActiveMenu("foods");
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setActiveMenu("home")}>
        <img src={assets.logo} alt="Logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            navigate("/");
            setActiveMenu("home");
          }}
          className={activeMenu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            navigate("/#explore-menu");
            setActiveMenu("menu");
          }}
          className={activeMenu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <Link
          to="/foods"
          onClick={() => setActiveMenu("foods")}
          className={activeMenu === "foods" ? "active" : ""}
        >
          Foods
        </Link>
        <a
          href="#mobile-app-download"
          onClick={() => {
            navigate("/#mobile-app-download");
            setActiveMenu("mobile-app");
          }}
          className={activeMenu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#contact-us"
          onClick={() => {
            navigate("/#contact-us");
            setActiveMenu("contact-us");
          }}
          className={activeMenu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img
          className="searchIcon"
          src={assets.search_icon}
          alt="Search Icon"
          title="Search Food"
          onClick={handleSearchClick}
        />
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
            {authUser.image ? (
              <Avatar
                className="imageAvatar"
                size="40"
                src={import.meta.env.VITE_CLOUDINARY_BASE_URL + authUser.image}
                round
              />
            ) : (
              <NameInitialsAvatar
                name={authUser.name}
                textColor={"Tomato"}
                backgroundColor={"#fff"}
                fontSize={16}
                borderColor="Tomato"
                borderWidth="1px"
              />
            )}
            <ul className="navbar-profile-dropdown">
              <li>
                <i
                  className="fa-regular fa-user fa-lg"
                  style={{
                    color: "#ff6347",
                    fontSize: "17px",
                  }}
                ></i>
                <p style={{ marginLeft: "5px" }}>
                  <Link to="/user/profile">Profile</Link>
                </p>
              </li>
              <hr />
              <li>
                <img src={assets.bag_icon} alt="Bag Icon" />
                <p>
                  <Link to="/user/orders">Orders</Link>
                </p>
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
