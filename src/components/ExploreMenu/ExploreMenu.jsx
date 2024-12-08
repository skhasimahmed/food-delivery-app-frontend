import "./ExploreMenu.css";
import { useContext, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = () => {
  const { categories, handleActiveCategory, selectedCategory } =
    useContext(StoreContext);
  const exploreMenuRef = useRef(null);
  const url = window.location.href;
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];

  return (
    <div className="explore-menu" id="explore-menu" ref={exploreMenuRef}>
      {lastSegment !== "foods" ? (
        <>
          <h1>Explore our menu</h1>
          <p className="explore-menu-text">
            Choose from a diverse menu featuring a delectable array of dishes.
            Our mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
        </>
      ) : (
        <h1>Choose your favourite category</h1>
      )}
      <div className="explore-menu-list">
        <div
          onClick={() => handleActiveCategory("All")}
          key="all"
          className="explore-menu-list-item"
        >
          <img
            className={selectedCategory === "All" ? "active" : ""}
            src={`${
              import.meta.env.VITE_CLOUDINARY_BASE_URL
            }development/1732863211853-1000_F_286178925_8zk89O9uC5JJVPvqhvBMUpaRxp8AFXzD`}
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
                className={selectedCategory === item.name ? "active" : ""}
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
