import { useContext, useEffect, useState } from "react";
import "./UserOrders.css";
import OrderPopup from "../../components/OrderPopUp/OrderPopup";
import DocumentTitle from "../../common/documentTitle";
import { StoreContext } from "../../context/StoreContext";
const UserOrders = () => {
  const { orderList, fetchOrderList, authUser, orderIsLoading, setActiveMenu } =
    useContext(StoreContext);
  DocumentTitle("Orders");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  useEffect(() => {
    setActiveMenu("");
    fetchOrderList(authUser.userId);
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
    <div className="orders-container">
      <h2>Orders</h2>
      <hr className="orders-separator" />
      <div className="table-wrapper">
        <table className="scrollable-table">
          <thead>
            <tr>
              <th>Sl. No.</th>
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
                      <td>{index + 1}</td>
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
                  <td colSpan="5">No order(s) found!</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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

export default UserOrders;
