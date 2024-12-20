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
import AddFood from "./pages/Admin/Foods/Add/Add";
import EditFood from "./pages/Admin/Foods/Edit/Edit";
import ListFoods from "./pages/Admin/Foods/List/List";
import Orders from "./pages/Admin/Orders/Orders";
import Settings from "./pages/Admin/Settings/Settings";
import ListUsers from "./pages/Admin/Users/List/List";
import EditUser from "./pages/Admin/Users/Edit/Edit";
import AdminNavbar from "./components/Admin/Navbar/Navbar";
import Sidebar from "./components/Admin/Sidebar/Sidebar";
import ListCategories from "./pages/Admin/Categories/List/List";
import AddCategory from "./pages/Admin/Categories/Add/Add";
import EditCategory from "./pages/Admin/Categories/Edit/Edit";
import ProfileSettings from "./pages/Users/ProfileSettings";
import UserOrders from "./pages/Users/UserOrders";
import Foods from "./pages/Food/Foods";

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
              <Route
                path="/foods"
                key={location.pathname}
                element={<Foods />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route
                path="/payment-confirmation"
                element={<PaymentConfirmation />}
              />
              <Route path="/user/profile" element={<ProfileSettings />} />
              <Route path="/user/orders" element={<UserOrders />} />
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

              <Route path="/admin/categories" element={<ListCategories />} />
              <Route
                path="/admin/categories/add"
                exact
                element={<AddCategory />}
              />
              <Route
                path="/admin/categories/:id/edit"
                exact
                element={<EditCategory />}
              />

              <Route path="/admin/foods" element={<ListFoods />} />
              <Route path="/admin/foods/add" exact element={<AddFood />} />
              <Route
                path="/admin/foods/:id/edit"
                exact
                element={<EditFood />}
              />

              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/settings" element={<Settings />} />

              <Route path="/admin/users" element={<ListUsers />} />
              <Route path="/admin/users/:id/edit" element={<EditUser />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
