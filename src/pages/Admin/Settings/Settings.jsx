import { useContext, useState } from "react";
import DocumentTitle from "../../../common/documentTitle";
import "./Settings.css";
import { StoreContext } from "../../../context/StoreContext";
import { assets } from "../../../assets/admin/assets";
import { toast } from "react-toastify";
import axiosInstance from "../../../common/axiosInstance";
const Settings = () => {
  DocumentTitle("Settings");

  const {
    API_BASE_URL,
    authUser,
    setAuthUser
  } = useContext(StoreContext);

  const [disabled, setDisabled] = useState(false);
  const [updatePasswordDisabled, setUpdatePasswordDisabled] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: authUser?.name,
    email: authUser?.email,
  });

  const [updatePasswordData, setUpdatePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", image ? image : null);
    setDisabled(true);
    const response = await axiosInstance.put(
      `${API_BASE_URL}api/users/update-profile/${authUser.userId}`,
      formData
    )
    .then(response => {
      if (response.data.success) {
        setImage(false);
        localStorage.setItem("authUser", JSON.stringify(response.data.user));
        setAuthUser(response.data.user);
        toast.success(response.data.message);
      } else toast.error(response.data.message);

      setDisabled(false);
    })
    .catch((err) => {
      setDisabled(false);
      toast.error(err.response.data.message);
    });
  };

  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    setUpdatePasswordDisabled(true);
    await axiosInstance.put(
      `${API_BASE_URL}api/users/change-password/${authUser.userId}`,
      updatePasswordData
    )
    .then(response => {
        setUpdatePasswordDisabled(false);
        if (response.data.success) {
          setUpdatePasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          })
          toast.success(response.data.message);
        } else { toast.error(response.data.message); }
    })
    .catch((err) => {
      setUpdatePasswordDisabled(false);
      toast.error(err.response.data.message);
    });
  };
  

  return (
    <>
      <div className="add-settings-page">
        <h2>Profile Settings</h2>
        <form className="flex-col" onSubmit={handleSubmit}>
          <div className="add-image-upload flex-col">
            <p>Upload Profile Image</p>
            <label htmlFor="image">
              <img
                src={ authUser.image && !image ? import.meta.env.VITE_CLOUDINARY_BASE_URL + authUser.image
                  : image ? (URL.createObjectURL(image)) : (assets.upload_area)
                }
                alt="Profile Image"
              />
            </label>

            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </div>

          <div className="add-category-name">
            <div className="flex-col">
              <p>Name <span className="requiredStar">*</span></p>
              <input
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
                type="text"
                placeholder="Enter Your Name"
                name="name"
                id="name"
                required
              />
            </div>
          </div>

          <div className="add-category-name">
            <div className="flex-col">
              <p>Email</p>
              <input
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                type="email"
                placeholder="Enter Your Email"
                name="email"
                id="email"
                disabled
              />
            </div>
          </div>

          <button type="submit" className="add-button" disabled={disabled || updatePasswordDisabled}>
            {disabled ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
      <div className="add-settings-page">
        <h2>Change Password</h2>
        <form className="flex-col" onSubmit={handleUpdatePasswordSubmit}>
          <div className="add-category-name">
            <div className="flex-col">
              <p>Current Password <span className="requiredStar">*</span></p>
              <input
                onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, currentPassword: e.target.value })}
                value={updatePasswordData.currentPassword}
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter Your Current Password"
                required
              />
            </div>
          </div>

          <div className="add-category-name">
            <div className="flex-col">
              <p>New Password <span className="requiredStar">*</span></p>
              <input
                onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, newPassword: e.target.value })}
                value={updatePasswordData.newPassword}
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                required
              />
            </div>
          </div>

          <div className="add-category-name">
            <div className="flex-col">
              <p>Confirm New Password <span className="requiredStar">*</span></p>
              <input
                onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, confirmNewPassword: e.target.value })}
                value={updatePasswordData.confirmNewPassword}
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Confirm Your New Password"
                required
              />
            </div>
          </div>

          <button type="submit" className="change-password-button" disabled={disabled || updatePasswordDisabled}>
            {updatePasswordDisabled ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
