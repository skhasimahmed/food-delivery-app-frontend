import './Navbar.css';
import { useContext, useState } from 'react';
import { assets } from '../../../assets/admin/assets';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { NameInitialsAvatar } from 'react-name-initials-avatar';

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

    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('authUser');

    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="FoodZie. Admin Logo" className="logo" />
      <div
        className="profile-container"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        {/* <img
          src={assets.profile_image}
          alt="Admin Profile Picture"
          className="profile"
        /> */}
        <NameInitialsAvatar
          name={authUser?.name}
          textColor={'Tomato'}
          backgroundColor={'#fff'}
          fontSize={16}
          borderColor="Tomato"
          borderWidth="1px"
        />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <i className="fas fa-user-edit"></i> &nbsp;Edit Profile
            </div>
            <div className="dropdown-item">
              <i className="fas fa-key"></i> &nbsp;Change Password
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> &nbsp;Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
