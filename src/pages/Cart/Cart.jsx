import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    foodList,
    removeFromCart,
    getTotalCartAmount,
    token,
    setActiveMenu,
  } = useContext(StoreContext);

  useEffect(() => {
    setActiveMenu(null);

    if (!token) {
      navigate('/');
    }
  });

  const navigate = useNavigate();

  return (
    <div className="cart">
      {Object.keys(cartItems).length > 0 && (
        <div className="cart-items-container">
          <h2>Cart</h2>
          <small>
            Please review the items in your cart{' '}
            {Object.keys(cartItems).length > 0 ? 'and place your order.' : '.'}
          </small>
          <hr className="cart-items-separator" />
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />

            {foodList.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img
                        src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}${
                          item.image
                        }`}
                        alt={item.nme}
                      />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>₹{item.price * cartItems[item._id]}</p>
                      <div
                        className="remove-item"
                        title="Remove"
                        onClick={() => removeFromCart(item._id)}
                      >
                        &times;
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Charge</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <strong>Total</strong>
                  <strong>
                    ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  </strong>
                </div>
              </div>
              <button onClick={() => navigate('/place-order')}>
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="cart-promo-code">
              <div>
                <p>Have a coupon? Enter here</p>
                <div className="cart-promo-code-input">
                  <input type="text" placeholder="Coupon code" />
                  <button>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {Object.keys(cartItems).length === 0 && (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <small>
            Before proceeding, you must add some items to your cart. You will
            find a lot of interesting items on our website.
          </small>
          <button
            className="continue-shopping"
            onClick={() => {
              navigate('/');
            }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
