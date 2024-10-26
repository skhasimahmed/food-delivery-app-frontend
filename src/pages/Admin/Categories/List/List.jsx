import { useEffect, useState } from 'react';
import DocumentTitle from '../../../../common/documentTitle';
import './List.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../../../../assets/admin/assets';
import axiosInstance from '../../../../common/axiosInstance';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const List = () => {
  DocumentTitle('Categories');

  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get('api/categories');
      setCategoryList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const removeCategory = async (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this Category?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: 'tomato',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(
            `api/categories/delete/${id}`,
          );

          if (response.data.success) {
            toast.success(response.data.message);
            fetchCategories();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error('An error occurred while deleting the category.');
        }
      }
    });
  };

  const editCategory = (id) => {
    navigate(`${id}/edit`);
  };

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
          <b style={{ textAlign: 'center' }}>Action</b>
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
                <p
                  onClick={() => editCategory(item._id)}
                  className="edit-category"
                >
                  {item.name}
                </p>
                <p>{item.description}</p>
                <div className="action">
                  <div
                    className="edit-category"
                    title="Edit"
                    onClick={() => editCategory(item._id)}
                  >
                    <i className="fa fa-pencil"></i>
                  </div>
                  <div
                    className="delete-category"
                    title="Remove"
                    onClick={() => removeCategory(item._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </div>
                </div>
              </div>
            );
          })}

        {categoryList.length === 0 && (
          <div className="no-data">
            <p>No data found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
