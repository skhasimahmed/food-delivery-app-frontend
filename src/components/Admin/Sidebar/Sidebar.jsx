import "./Sidebar.css";
import { assets } from "../../../assets/admin/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const options = [
    { to: "/admin/dashboard", icon: assets.dashboard_icon, label: "Dashboard" },
    {
      to: "/admin/categories",
      icon: assets.categories_icon,
      label: "Categories",
    },
    { to: "/admin/foods", icon: assets.list_icon, label: "Foods" },
    { to: "/admin/orders", icon: assets.order_icon, label: "Orders" },
    { to: "/admin/users", icon: assets.users_icon, label: "Users" },
    { to: "/admin/settings", icon: assets.settings_icon, label: "Settings" },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? "▶" : "◀"}
      </button>
      <div className="options">
        {options.map((option) => (
          <NavLink
            key={option.to}
            to={option.to}
            className={`option ${
              location.pathname === option.to ? "active" : ""
            }`}
            aria-label={option.label}
          >
            <img
              src={option.icon}
              alt={`${option.label} Icon`}
              title={option.label}
            />
            {!isCollapsed && <p>{option.label}</p>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
