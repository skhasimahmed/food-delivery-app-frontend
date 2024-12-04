import "./ExploreMenu.css";
import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = () => {
  const { categories, activeMenu, setActiveMenu, fetchFoodList, currentFetchFoodUrl } = useContext(StoreContext);
  const exploreMenuRef = useRef(null); 

  useEffect(() => {
    if(activeMenu === 'menu') {
      exploreMenuRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeMenu]);

  const [category, setCategory] = useState("All")
  
  const handleActiveCategory = (itemName) => {
    let selectedCategory = category === itemName ? "All" : itemName
    setCategory(selectedCategory);
    fetchFoodList(currentFetchFoodUrl.page, currentFetchFoodUrl.limit, currentFetchFoodUrl.search, selectedCategory, currentFetchFoodUrl.priceShort);
    setActiveMenu("foods");  
  }

  // Get the full URL
  const url = window.location.href;
  // Split the URL into segments using '/' as the delimiter
  const segments = url.split('/');
  // Get the last segment (the last part after the last '/')
  const lastSegment = segments[segments.length - 1];

  return (
    <div className="explore-menu" id="explore-menu" ref={exploreMenuRef}>
      {
        lastSegment !== 'foods' ? (
          <>
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">
              Choose from a diverse menu featuring a delectable array of dishes. Our
              mission is to satisfy your cravings and elevate your dining experience,
              one delicious meal at a time.
            </p>
          </>
        ) : (<h1>Choose your favourite category</h1>)
      }
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