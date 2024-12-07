import { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";
import axiosInstance from "../../common/axiosInstance";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image, ratings }) => {
  const {
    API_BASE_URL,
    cartItems,
    addToCart,
    removeFromCart,
    authUser,
    token,
    setShowLogin,
    fetchFoodList,
    currentFetchFoodUrl,
  } = useContext(StoreContext);

  let totalRating = !ratings.length
    ? 0
    : ratings.reduce((acc, newVal) => acc + newVal.rating, 0);
  let averageRating = !totalRating ? 0 : totalRating / ratings.length;

  const handleSubmitRating = async (rating, foodId) => {
    if (!token) {
      setShowLogin(true);
      toast.error("Please login to give rating");
      return false;
    }
    const newReview = {
      rating,
      foodId,
      userId: authUser?.userId,
    };

    await axiosInstance
      .post(`${API_BASE_URL}api/user/give-rating/${authUser.userId}`, newReview)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          fetchFoodList(
            currentFetchFoodUrl.page,
            currentFetchFoodUrl.limit,
            currentFetchFoodUrl.search,
            currentFetchFoodUrl.category,
            currentFetchFoodUrl.priceShort
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img
          src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}${image}`}
          alt={name}
          className="food-item-image"
        />
        {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((item) =>
              item <= averageRating ? (
                <span
                  className="star"
                  key={item}
                  onClick={() => handleSubmitRating(item, id)}
                >
                  &#9733;
                </span>
              ) : (
                <span
                  className="star"
                  key={item}
                  onClick={() => handleSubmitRating(item, id)}
                >
                  &#9734;
                </span>
              )
            )}
          </div>
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
