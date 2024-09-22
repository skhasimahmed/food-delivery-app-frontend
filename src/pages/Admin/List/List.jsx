import { useContext, useEffect, useState } from "react";
import "./List.css";
import { assets } from "../../../assets/admin/assets";
import { toast } from "react-toastify";
import axiosInstance from "../../../common/axiosInstance";
import DocumentTitle from "../../../common/documentTitle";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
const List = () => {
  const { API_BASE_URL } = useContext(StoreContext);

  DocumentTitle("Foods");

  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axiosInstance.get(`${API_BASE_URL}api/food/list`);

    if (response.data.success) {
      setFoodList(response.data.data);
      toast.success(response.data.message);
    } else toast.error(response.data.message);
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const removeFood = async (id) => {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}api/food/delete/${id}`
    );
    if (response.data.success) {
      toast.success(response.data.message);
      fetchFoodList();
    } else toast.error(response.data.message);
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
          <b>Action</b>
        </div>
        {foodList.length > 0 &&
          foodList.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img
                  src={`${API_BASE_URL}images/${item.image}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p
                  onClick={() => removeFood(item._id)}
                  className="delete-food"
                  title="Delete"
                >
                  x
                </p>
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
