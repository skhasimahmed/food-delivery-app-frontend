import "./ExploreMenu.css";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { categories, activeMenu, setActiveMenu } = useContext(StoreContext);
  const exploreMenuRef = useRef(null); 

  useEffect(() => {
    if(activeMenu === 'menu') {
      exploreMenuRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeMenu]);
  
  const handleActiveCategory = (itemName) => {
    setCategory(prev => {
      if (prev === itemName) return "All";
      else return itemName;
    });
    setActiveMenu("foods");  
  }

  return (
    <div className="explore-menu" id="explore-menu" ref={exploreMenuRef}>
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        <div
          onClick={() => handleActiveCategory("All")}
          key="all"
          className="explore-menu-list-item"
        >
          <img
            className={category === 'All' ? "active" : ""}
            src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}development/1732863211853-1000_F_286178925_8zk89O9uC5JJVPvqhvBMUpaRxp8AFXzD`}
            alt="All"
          />
          <p>All</p>
        </div>
        {categories.map((item, index) => {
          return (
            <div
              onClick={() => handleActiveCategory(item.name)}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.name ? "active" : ""}
                src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}${item.image}`}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};
