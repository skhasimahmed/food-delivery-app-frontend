import "./ExploreMenu.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { categories } = useContext(StoreContext);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {categories.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) => {
                  if (prev === item.name) return "All";
                  else return item.name;
                })
              }
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
