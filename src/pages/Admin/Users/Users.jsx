import { useContext } from "react";
import DocumentTitle from "../../../common/documentTitle";
import "./Users.css";
import { StoreContext } from "../../../context/StoreContext";
const Users = () => {
  const { API_BASE_URL } = useContext(StoreContext);

  DocumentTitle("Users");

  return (
    <div className="orders add flex-col">
      <p>Users</p>
    </div>
  );
};

export default Users;
