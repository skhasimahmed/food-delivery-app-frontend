import { useEffect, useState } from "react";
import "./Edit.css";
import { toast } from "react-toastify";
import DocumentTitle from "../../../../common/documentTitle";
import axiosInstance from "../../../../common/axiosInstance";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);

  DocumentTitle("Edit User");

  const [data, setData] = useState({
    name: "",
    email: "",
    isAdmin: "",
    stripeCustomerId: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`api/users/${id}`);
        const userData = response.data;
        setData({
          name: userData.data.name,
          email: userData.data.email,
          isAdmin: userData.data.isAdmin,
          stripeCustomerId: userData.data.stripeCustomerId,
        });
      } catch (error) {
        toast.error("Failed to load user data.");
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);

    try {
      const response = await axiosInstance.put(`api/users/update/${id}`, data);

      if (response.data.success) toast.success("User updated successfully.");
      else toast.error(response.data.message);

      setDisabled(false);
    } catch (error) {
      toast.error("Failed to submit the form.");
      setDisabled(false);
    }
  };

  return (
    <div className="edit edit-user">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="edit-name">
          <div className="flex-col">
            <p>Name</p>
            <input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              type="text"
              placeholder="John Doe"
              required
              name="name"
              id="name"
            />
          </div>
        </div>

        <div className="edit-email">
          <div className="flex-col">
            <p>Email</p>
            <input
              disabled
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
              type="email"
              placeholder="user@foodzie.com"
              readOnly
              required
              name="email"
              id="email"
            />
          </div>
        </div>

        <div className="edit-stripe-customer-id">
          <div className="flex-col">
            <p>Stripe Customer ID</p>
            <input
              disabled
              onChange={(e) =>
                setData({ ...data, stripeCustomerId: e.target.value ?? "" })
              }
              value={data.stripeCustomerId ?? ""}
              type="text"
              placeholder="cus_qJLjlhdh446Q"
              readOnly
              required
              name="stripeCustomerId"
              id="stripeCustomerId"
            />
          </div>
        </div>

        <div className="edit-is-admin">
          <div className="flex-col">
            <p>Is Admin?</p>
            <select
              name="isAdmin"
              id="isAdmin"
              value={data.isAdmin ? "1" : "0"}
              onChange={(e) => setData({ ...data, isAdmin: e.target.value })}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
        <button type="submit" className="update-button" disabled={disabled}>
          {disabled ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Edit;
