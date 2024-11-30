import { useContext, useEffect, useRef } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import PropTypes from "prop-types";

const FoodDisplay = ({ category }) => {
  const { foodList, activeMenu } = useContext(StoreContext);
  const foodsMenuRef = useRef();
  useEffect(() => {
    if(activeMenu === 'foods') {
      foodsMenuRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  });
  return (
    <div className="food-display" id="food-display" ref={foodsMenuRef}>
      <h2>Top dishes near you: <span>{category}</span></h2>
      <div className="food-display-list">
        {
          foodList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              );
            }
          })
        }
      </div>
    </div>
  );
};

export default FoodDisplay;

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};
