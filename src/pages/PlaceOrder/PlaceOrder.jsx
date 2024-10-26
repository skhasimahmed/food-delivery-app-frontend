import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import { toast } from 'react-toastify';
import axiosInstance from '../../common/axiosInstance';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, API_BASE_URL, foodList } =
    useContext(StoreContext);

  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    const orderItems = [];

    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    let orderData = {
      address: addressData,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // +2 for delivery fee
      deliveryCharge: 2,
    };

    const apiUrl = API_BASE_URL + 'api/order/place';

    let response = await axiosInstance.post(apiUrl, orderData, {
      headers: {
        token,
      },
    });

    if (response.data.success) {
      const { url } = response.data;
      window.location.replace(url); // redirect to stripe
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrderHandler}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="input-groups">
          <input
            required
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={onChangeHandler}
            value={addressData.firstName}
          />
          <input
            required
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={onChangeHandler}
            value={addressData.lastName}
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email address"
          name="email"
          onChange={onChangeHandler}
          value={addressData.email}
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={addressData.street}
        />
        <div className="input-groups">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={addressData.city}
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={addressData.state}
          />
        </div>
        <div className="input-groups">
          <input
            required
            type="text"
            placeholder="Zip code"
            name="zipcode"
            onChange={onChangeHandler}
            value={addressData.zipcode}
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={addressData.country}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={onChangeHandler}
          value={addressData.phone}
        />
      </div>
      <div className="place-order-right">
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
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
