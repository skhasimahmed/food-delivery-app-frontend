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
              id: data._id
            },
            {
              headers: {
                token
              }
            }
          );

          if (response.data.success) {
            toast.success(response.data.message)
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
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Order Details {isAdmin && (`- ${selectedOrderId}`)}</h2>
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="modal-header">
          { isAdmin && <p><strong>Customer:</strong> {data.userId.name}, {data.userId.email}</p> }
          <p><strong>Payable Price:</strong> ₹{data.amount}</p>
          <p><strong>Payment Status:</strong> <span className={`status ${data.paymentStatus}`}>{data.paymentStatus}</span></p>
          <p><strong>Order Status:</strong> <span className={`status ${data.status}`}>{data.status}</span></p>
          {
            isAdmin && <div>
              <label htmlFor="orderStatus">Change Order Status: </label>
              <select 
                id="orderStatus" 
                value={orderStatus} 
                onChange={e => handleStatusChange(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          }
        </div>
        
        <div className="order-items">
          <h3>Order Items</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Price/Item</th>
                <th>Quantity</th>
                <th>Total Price</th>
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
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
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