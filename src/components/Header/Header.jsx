import { useContext } from "react";
import "./Header.css";
import { StoreContext } from "../../context/StoreContext";

const Header = () => {
  const {setActiveMenu} = useContext(StoreContext);

  const handleViewMore = () => {
    window.location.href = '/#explore-menu'
    setActiveMenu('menu')
  }
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order your favorite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button onClick={handleViewMore}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
