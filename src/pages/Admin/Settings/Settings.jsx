import { useContext } from "react";
import DocumentTitle from "../../../common/documentTitle";
import "./Settings.css";
import { StoreContext } from "../../../context/StoreContext";
const Settings = () => {
  const { API_BASE_URL } = useContext(StoreContext);

  DocumentTitle("Settings");

  return (
    <div className="orders add flex-col">
      <p>Settings</p>
    </div>
  );
};

export default Settings;
