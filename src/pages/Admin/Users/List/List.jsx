import { useEffect, useState } from "react";
import axiosInstance from "../../../../common/axiosInstance";
import DocumentTitle from "../../../../common/documentTitle";
import "./List.css";

import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../../../assets/admin/assets";
import { toast } from "react-toastify";
const Users = () => {
  DocumentTitle("Users");

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get("api/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const editUser = (id) => {
    navigate(`${id}/edit`);
  };

  const removeUser = async ({ _id, isAdmin }) => {
    if (isAdmin) {
      toast.warning("Admin user cannot be deleted");
      return;
    }

    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "tomato",
      cancelButtonColor: "black",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(
            `api/users/delete/${_id}`
          );
          if (response.data.success) {
            toast.success(response.data.message);
            fetchUsers();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("An error occurred while deleting the user!");
        }
      }
    });
  };

  return (
    <div className="users-list flex-col">
      <div className="list-header">
        <span className="title">All Users</span>
        <NavLink to="/admin/users/add" className="add-user">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add User</p>
        </NavLink>
      </div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Is Admin?</b>
          <b>Registration Date</b>
          <b>Stripe ID</b>
          <b style={{ textAlign: "center" }}>Action</b>
        </div>
        {users.length > 0 &&
          users.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <p className="user-name" onClick={() => editUser(item._id)}>
                  {item.name}
                </p>
                <p>{item.email}</p>
                <p>{item.isAdmin ? "Yes" : "No"}</p>
                <p>{new Date(item.createdAt).toLocaleString()}</p>
                <p>{item.stripeCustomerId ?? "N/A"}</p>
                <div className="action">
                  <div
                    className="edit-category"
                    title="Edit"
                    onClick={() => editUser(item._id)}
                  >
                    <i className="fa fa-pencil"></i>
                  </div>
                  <div
                    className="delete-category"
                    title="Remove"
                    onClick={() => removeUser(item)}
                  >
                    <i className="fa fa-trash"></i>
                  </div>
                </div>
              </div>
            );
          })}

        {users.length === 0 && (
          <div className="no-data">
            <p>No data found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
