import "./ProfileSettings.css";
import { useContext, useEffect, useState } from "react";
import DocumentTitle from "../../common/documentTitle";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/admin/assets";
import { toast } from "react-toastify";
import axiosInstance from "../../common/axiosInstance";

const ProfileSettings = () => {
  DocumentTitle("Profile Settings");

  const { API_BASE_URL, authUser, setAuthUser, setActiveMenu } =
    useContext(StoreContext);

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
    confirmNewPassword: "",
  });

  useEffect(() => {
    setActiveMenu("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", image ? image : null);
    setDisabled(true);
    await axiosInstance
      .put(
        `${API_BASE_URL}api/users/update-profile/${authUser.userId}`,
        formData
      )
      .then((response) => {
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
    await axiosInstance
      .put(
        `${API_BASE_URL}api/users/change-password/${authUser.userId}`,
        updatePasswordData
      )
      .then((response) => {
        setUpdatePasswordDisabled(false);
        if (response.data.success) {
          setUpdatePasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        setUpdatePasswordDisabled(false);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="user-profile">
      <form onSubmit={handleSubmit}>
        <div className="user-profile-left">
          <p className="title">Update Profile</p>
          <div className="flex-col">
            <p>Upload Profile Image</p>
            <label htmlFor="image">
              <img
                src={
                  authUser.image && !image
                    ? import.meta.env.VITE_CLOUDINARY_BASE_URL + authUser.image
                    : image
                    ? URL.createObjectURL(image)
                    : assets.upload_area
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
          <div className="flex-col">
            <p>
              Name <span className="requiredStar">*</span>
            </p>
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
          <div className="button-div">
            <button type="submit" disabled={disabled || updatePasswordDisabled}>
              {disabled ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
      <form onSubmit={handleUpdatePasswordSubmit}>
        <div className="user-profile-left">
          <p className="title">Change Password</p>
          <div className="flex-col">
            <p>
              Current Password <span className="requiredStar">*</span>
            </p>
            <input
              onChange={(e) =>
                setUpdatePasswordData({
                  ...updatePasswordData,
                  currentPassword: e.target.value,
                })
              }
              value={updatePasswordData.currentPassword}
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter Your Current Password"
              required
            />
          </div>
          <div className="flex-col">
            <p>
              New Password <span className="requiredStar">*</span>
            </p>
            <input
              onChange={(e) =>
                setUpdatePasswordData({
                  ...updatePasswordData,
                  newPassword: e.target.value,
                })
              }
              value={updatePasswordData.newPassword}
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              required
            />
          </div>
          <div className="flex-col">
            <p>
              Confirm New Password <span className="requiredStar">*</span>
            </p>
            <input
              onChange={(e) =>
                setUpdatePasswordData({
                  ...updatePasswordData,
                  confirmNewPassword: e.target.value,
                })
              }
              value={updatePasswordData.confirmNewPassword}
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder="Confirm Your New Password"
              required
            />
          </div>
          <div className="button-div">
            <button type="submit" disabled={disabled || updatePasswordDisabled}>
              {updatePasswordDisabled
                ? "Changing Password..."
                : "Change Password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
