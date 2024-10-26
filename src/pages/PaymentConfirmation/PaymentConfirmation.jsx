import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import './PaymentConfirmation.css';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [orderId] = useState(new URLSearchParams(search).get('orderId'));
  const [success, setSuccess] = useState(
    new URLSearchParams(search).get('success'),
  );

  const { API_BASE_URL, token, setActiveMenu } = useContext(StoreContext);

  const [paymentInfo, setPaymentInfo] = useState();

  useEffect(() => {
    setActiveMenu(null);

    getPaymentInfoByOrderId(orderId);
  }, []);

  const getPaymentInfoByOrderId = async (orderId) => {
    await axios
      .get(`${API_BASE_URL}api/order/payment-info?orderId=${orderId}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        if (response.data.success && response.data.data) {
          setPaymentInfo(response.data.data);

          if (
            response.data.data.status === 'succeeded' &&
            response.data.data.chargeStatus === 'paid'
          ) {
            setSuccess('true');
          } else {
            setSuccess('false');
          }
        } else {
          toast.error(response.data.message);
          navigate('/');
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate('/');
      });
  };

  return (
    <div className="payment-confirmation">
      {success == 'true' ? (
        <div className="success">
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <h2> Payment successful! </h2>
          <p>
            Thank you for your payment. Your order has been successfully placed.{' '}
          </p>
          <hr />
          <p className="order-info">
            Order ID: <strong>{orderId}</strong>
          </p>
          <p className="order-info">
            Order Placed at:{' '}
            <strong>
              {paymentInfo
                ? new Date(paymentInfo.createdAt).toLocaleString()
                : ''}
            </strong>
          </p>
          <p className="order-total">
            <strong>
              {' '}
              ₹{paymentInfo ? Number(paymentInfo.amount).toFixed(2) : '0.00'}
            </strong>
          </p>

          <button onClick={() => navigate('/#explore-menu')}>View Menu</button>
        </div>
      ) : (
        <div className="failed">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
          <h2> Payment failed! </h2>
          <p>Sorry, your payment was not successful. Please try again.</p>

          <button onClick={() => navigate('/cart')}>View Cart</button>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
