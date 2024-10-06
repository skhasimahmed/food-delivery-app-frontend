import { useContext, useEffect, useState } from "react";
import "./List.css";

import Swal from "sweetalert2";

import { assets } from "../../../assets/admin/assets";
import { toast } from "react-toastify";
import axiosInstance from "../../../common/axiosInstance";
import DocumentTitle from "../../../common/documentTitle";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
const List = () => {
  const navigate = useNavigate();

  const { API_BASE_URL } = useContext(StoreContext);

  DocumentTitle("Foods");

  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axiosInstance.get(`${API_BASE_URL}api/food/list`);

    if (response.data.success) {
      setFoodList(response.data.data);
      // toast.success(response.data.message);
    } else toast.error(response.data.message);
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const editFood = (id) => {
    navigate(`${id}/edit`);
  };

  // const confirm = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await axiosInstance.delete(
  //           `${API_BASE_URL}api/food/delete/${id}`
  //         );

  //         if (response.data.success) {
  //           toast.success(response.data.message);
  //           fetchFoodList();
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //       } catch (error) {
  //         toast.error("An error occurred while deleting the food item.");
  //       }
  //     } else {
  //       Swal.fire("Cancelled", "Your file is safe :)", "info");
  //     }
  //   });
  // };
  const removeFood = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this food item?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(
            `${API_BASE_URL}api/food/delete/${id}`
          );

          if (response.data.success) {
            toast.success(response.data.message);
            fetchFoodList();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("An error occurred while deleting the food item.");
        }
      }
    });
  };

  return (
    <div className="list add flex-col">
      <div className="list-header">
        <span className="title">All Foods</span>
        <NavLink to="/admin/foods/add" className="add-food">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Food</p>
        </NavLink>
      </div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b style={{ textAlign: "center" }}>Action</b>
        </div>
        {foodList.length > 0 &&
          foodList.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img
                  src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}${
                    item.image
                  }`}
                  alt={item.name}
                />
                <p onClick={() => editFood(item._id)} className="edit-food">
                  {item.name}
                </p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <div className="action">
                  <div
                    className="edit-food"
                    title="Edit"
                    onClick={() => editFood(item._id)}
                  >
                    <i className="fa fa-pencil"></i>
                  </div>{" "}
                  <div
                    className="delete-food"
                    title="Remove"
                    onClick={() => removeFood(item._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </div>
                </div>
              </div>
            );
          })}

        {foodList.length === 0 && (
          <div className="no-data">
            <p>No food(s) found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
