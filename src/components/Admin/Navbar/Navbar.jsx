import "./Navbar.css";
import { useContext, useState } from "react";
import { assets } from "../../../assets/admin/assets";
import { StoreContext } from "../../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import Avatar from "react-avatar";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { setToken, setIsAdmin, authUser, setAuthUser } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false);
    setToken(null);
    setIsAdmin(false);
    setAuthUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("authUser");

    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <img
        src={assets.logo}
        alt="FoodZie. Admin Logo"
        className="logo admin-logo"
        onClick={() => navigate("/admin/dashboard")}
      />
      <div
        className="profile-container"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        {authUser.image ? (
          <Avatar
            className="imageAvatar"
            size="40"
            src={import.meta.env.VITE_CLOUDINARY_BASE_URL + authUser.image}
            round
          />
        ) : (
          <NameInitialsAvatar
            name={authUser?.name}
            textColor={"Tomato"}
            backgroundColor={"#fff"}
            fontSize={16}
            borderColor="Tomato"
            borderWidth="1px"
          />
        )}
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <Link to="/admin/settings">
                <i className="fas fa-gear"></i> &nbsp;&nbsp;Settings
              </Link>
            </div>

            <hr className="dropdown-divider" />

            <div className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
