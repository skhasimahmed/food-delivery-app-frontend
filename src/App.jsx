import { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import SignInSignUpPopup from "./components/SignInSignUpPopup/SignInSignUpPopup";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "./context/StoreContext";
import NotFound from "./pages/NotFound/NotFound";
import PaymentConfirmation from "./pages/PaymentConfirmation/PaymentConfirmation";

const App = () => {
  const { showLogin, setShowLogin } = useContext(StoreContext);
  return (
    <>
      {showLogin ? <SignInSignUpPopup setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <ToastContainer />

        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route
            path="/payment-confirmation"
            element={<PaymentConfirmation />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
