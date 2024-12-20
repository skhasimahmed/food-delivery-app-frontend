import { useContext, useRef } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useNavigate } from "react-router-dom";

const FoodDisplay = ({ searchQuery = "" }) => {
  const {
    foodList,
    setActiveMenu,
    currentFetchFoodUrl,
    fetchFoodList,
    foodsLoading,
  } = useContext(StoreContext);
  const foodsMenuRef = useRef();

  // Get the full URL
  const url = window.location.href;
  // Split the URL into segments using '/' as the delimiter
  const segments = url.split("/");
  // Get the last segment (the last part after the last '/')
  const lastSegment = segments[segments.length - 1];

  const navigate = useNavigate();

  const handleViewMore = () => {
    setActiveMenu("foods");
    navigate("/foods");
  };

  const handlePriceSortChange = (value) => {
    fetchFoodList(
      currentFetchFoodUrl.page,
      currentFetchFoodUrl.limit,
      currentFetchFoodUrl.search,
      currentFetchFoodUrl.category,
      value
    );
  };

  return (
    <div className="food-display" id="food-display" ref={foodsMenuRef}>
      <div className="container">
        <h2>
          Top dishes near you: &nbsp;
          <span>
            {searchQuery.length > 0
              ? `Searching for "${searchQuery}" in category "${currentFetchFoodUrl.category}"`
              : `${
                  currentFetchFoodUrl.category != undefined
                    ? currentFetchFoodUrl.category
                    : "All"
                }`}
          </span>
        </h2>
        <div>
          <label htmlFor="sortOrder">Sort by Price:</label>
          <select
            id="sortOrder"
            onChange={(e) => handlePriceSortChange(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {foodsLoading && <div className="loader loading"></div>}

      {!foodsLoading && foodList.length > 0 && (
        <>
          <div className="food-display-list">
            {foodList.map((item, index) => {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  ratings={item.ratings}
                />
              );
            })}
          </div>
          {lastSegment === "" && (
            <div className="view-more-div">
              <button className="view-more-btn" onClick={handleViewMore}>
                View Foods
              </button>
            </div>
          )}
        </>
      )}

      {!foodsLoading && foodList.length === 0 && (
        <div className="no-products-container">
          <div className="no-products-message">
            <h3 className="no-products-header">No food(s) found!</h3>
            <p>
              Sorry, we couldn&apos;t find any food that matches your search.
              Please try again later or adjust your search criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
