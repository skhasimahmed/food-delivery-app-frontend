import { useContext, useEffect, useState } from "react";
import DocumentTitle from "../../../common/documentTitle";
import "./Orders.css";
import { StoreContext } from "../../../context/StoreContext";
import OrderPopup from "../../../components/OrderPopUp/OrderPopup";
const Orders = () => {
  const { orderList, fetchOrderList, orderIsLoading } =
    useContext(StoreContext);
  DocumentTitle("Orders");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  useEffect(() => {
    fetchOrderList();
  }, []);

  // Function to open modal and set selected row
  const handleRowClick = (rowData, orderId) => {
    setSelectedRow(rowData);
    setSelectedOrderId(orderId);
    setIsModalOpen(true); // Open modal when row is clicked
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    setSelectedOrderId("");
  };

  return (
    <div className="order-container">
      <span>All Orders</span>
      <hr className="orders-separator" />
      <div className="table-wrapper">
        <table className="scrollable-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Items</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orderIsLoading && (
              <tr>
                <td colSpan="6">
                  <div className="loader loading"></div>
                </td>
              </tr>
            )}
            {!orderIsLoading &&
              (orderList.length > 0 ? (
                orderList.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(item, `#00${index}`)}
                    >
                      <td>#00{index}</td>
                      <td>
                        {item.userId.name}, {item.userId.email}
                      </td>
                      <td>{item.items?.length}</td>
                      <td>₹{item.amount}</td>
                      <td>
                        <span className={`status ${item.paymentStatus}`}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`status ${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No Orders Found!</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Modal will only open if isModalOpen is true */}
      {isModalOpen && (
        <OrderPopup
          data={selectedRow}
          selectedOrderId={selectedOrderId}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Orders;
