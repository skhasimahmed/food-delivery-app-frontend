import { useContext, useState } from "react";
import "./OrderPopup.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axiosInstance from "../../common/axiosInstance";
import { StoreContext } from "../../context/StoreContext";

const OrderPopup = ({ data, selectedOrderId, closeModal }) => {
  const { token, fetchOrderList, isAdmin } = useContext(StoreContext);
  const [orderStatus, setOrderStatus] = useState(data.status);

  const handleStatusChange = (value) => {
    setOrderStatus(value);
    Swal.fire({
      title: "Are you sure you want to change this Order's delivery status?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "tomato",
      cancelButtonColor: "black",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.post(
            `api/order/change-status`,
            {
              status: value,
              id: data._id,
            },
            {
              headers: {
                token,
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            fetchOrderList();
            closeModal();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("An error occurred while changing the delivery status.");
        }
      } else {
        setOrderStatus(data.status);
      }
    });
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Order Details {isAdmin && `- ${selectedOrderId}`}</h2>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="modal-header">
          {isAdmin && (
            <p>
              <strong>Customer:</strong> {data.userId.name}, {data.userId.email}
            </p>
          )}
          <p>
            <strong>Amount:</strong> ₹{data.amount.toFixed(2)}
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            <span className={`status ${data.paymentStatus}`}>
              {data.paymentStatus}
            </span>
          </p>
          <p>
            <strong>Order Status:</strong>{" "}
            <span className={`status ${data.status}`}>{data.status}</span>
          </p>
          {isAdmin && (
            <div>
              <label htmlFor="orderStatus">Change Order Status: </label>
              <select
                id="orderStatus"
                value={orderStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          )}

          <p>
            <strong>Date:</strong>{" "}
            <span>
              {new Date(data.createdAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </p>
        </div>

        <div className="order-items">
          <h3>Ordered Items</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty.</th>
                <th className="total">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}${
                        item.image
                      }`}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td className="total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">
                  <strong>Delivery Charge</strong>
                </td>
                <td colSpan="1" className="total">
                  ₹{2}.00
                </td>
              </tr>
              <tr></tr>
              <td colSpan="4">
                <strong>Grand Total</strong>
              </td>
              <td colSpan="1" className="total">
                ₹{data.amount.toFixed(2)}
              </td>
            </tbody>
          </table>
        </div>

        <div className="modal-actions">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
