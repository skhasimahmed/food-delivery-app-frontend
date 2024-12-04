import { useContext, useEffect, useState } from "react";
import "./UserOrders.css";
import OrderPopup from "../../components/OrderPopUp/OrderPopup";
import DocumentTitle from "../../common/documentTitle";
import { StoreContext } from "../../context/StoreContext";
const UserOrders = () => {
  const { orderList, fetchOrderList, authUser, orderIsLoading } = useContext(StoreContext);
  DocumentTitle("Orders");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  useEffect(() => {
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
    setSelectedOrderId('');
  };

  return (      
    <div className="order-container">
      <h2>Order Details</h2>
      <div className="table-wrapper">
        <table className="scrollable-table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Total Items</th>
              <th>Payable Price</th>
              <th>Payment Status</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orderIsLoading && (<tr>
                  <td colSpan="6">
                  <div className="loader loading"></div></td>
                </tr>
              )
            }
            {
              !orderIsLoading && (
                orderList.length > 0 ? (
                  orderList.map((item, index) => {
                    return (
                      <tr key={index} onClick={() => handleRowClick(item, `#00${index}`)}>
                        <td>{index + 1}</td>
                        <td>{item.items?.length}</td>
                        <td>₹{item.amount}</td>
                        <td><span className={`status ${item.paymentStatus}`}>{item.paymentStatus}</span></td>
                        <td><span className={`status ${item.status}`}>{item.status}</span></td>
                      </tr>
                    );
                  })) : (
                  <tr>
                    <td colSpan="5">No Orders Found!</td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
      {/* Modal will only open if isModalOpen is true */}
      {
        isModalOpen && (
          <OrderPopup 
            data={selectedRow}
            selectedOrderId={selectedOrderId}
            closeModal={handleCloseModal} 
          />
        )
      }
    </div>
  );
};

export default UserOrders;
