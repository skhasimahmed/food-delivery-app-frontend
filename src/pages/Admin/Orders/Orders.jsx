// import { useContext } from 'react';
import DocumentTitle from '../../../common/documentTitle';
import './Orders.css';
// import { StoreContext } from '../../../context/StoreContext';
const Orders = () => {
  // const { API_BASE_URL } = useContext(StoreContext);

  DocumentTitle('Orders');

  return (
    <div className="orders add flex-col">
      <p>Orders</p>
    </div>
  );
};

export default Orders;
