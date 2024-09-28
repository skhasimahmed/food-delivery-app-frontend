import { useContext } from "react";
import UserNavbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import SignInSignUpPopup from "./components/SignInSignUpPopup/SignInSignUpPopup";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "./context/StoreContext";
import NotFound from "./pages/NotFound/NotFound";
import PaymentConfirmation from "./pages/PaymentConfirmation/PaymentConfirmation";

import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Add from "./pages/Admin/Add/Add";
import Edit from "./pages/Admin/Edit/Edit";
import List from "./pages/Admin/List/List";
import Orders from "./pages/Admin/Orders/Orders";
import Settings from "./pages/Admin/Settings/Settings";
import Users from "./pages/Admin/Users/Users";
import AdminNavbar from "./components/Admin/Navbar/Navbar";
import Sidebar from "./components/Admin/Sidebar/Sidebar";

const App = () => {
  const { showLogin, setShowLogin, isAdmin } = useContext(StoreContext);
  return (
    <>
      {/* <ToastContainer /> */}

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        draggable
        transition={Slide}
      />

      {isAdmin === false ? (
        <div className="user">
          {showLogin ? <SignInSignUpPopup setShowLogin={setShowLogin} /> : null}
          <div className="app">
            <UserNavbar setShowLogin={setShowLogin} />
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
        </div>
      ) : (
        <div className="admin">
          <AdminNavbar />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="" element={<Dashboard />}>
                <Route path="/admin/dashboard/" element={<Dashboard />} />
              </Route>

              <Route path="/admin/foods" element={<List />} />
              <Route path="/admin/foods/add" exact element={<Add />} />
              <Route path="/admin/foods/:id/edit" exact element={<Edit />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/users" element={<Users />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
