import { useContext, useState } from "react";
import DocumentTitle from "../../../common/documentTitle";
import "./Categories.css";
import { StoreContext } from "../../../context/StoreContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../../assets/admin/assets";
const Categories = () => {
  const { API_BASE_URL } = useContext(StoreContext);

  DocumentTitle("Categories");

  const [categoryList, setCategoryList] = useState([]);

  return (
    <div className="categories-list add flex-col">
      <div className="list-header">
        <span className="title">All Categories</span>
        <NavLink to="/admin/categories/add" className="add-category">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Category</p>
        </NavLink>
      </div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b style={{ textAlign: "center" }}>Action</b>
        </div>
        {categoryList.length > 0 &&
          categoryList.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img
                  src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}${
                    item.image
                  }`}
                  alt={item.name}
                />
                <p onClick={() => ""} className="edit-category">
                  {item.name}
                </p>
                <p>{item.description}</p>
                <div className="action">
                  <div
                    className="edit-category"
                    title="Edit"
                    onClick={() => ""}
                  >
                    <i className="fa fa-pencil"></i>
                  </div>
                  <div
                    className="delete-category"
                    title="Remove"
                    onClick={() => ""}
                  >
                    <i className="fa fa-trash"></i>
                  </div>
                </div>
              </div>
            );
          })}

        {categoryList.length === 0 && (
          <div className="no-data">
            <p>No category(s) found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
