import { useEffect, useState } from "react";
import { assets } from "../../../../assets/admin/assets";
import "./Edit.css";
import { toast } from "react-toastify";
import DocumentTitle from "../../../../common/documentTitle";
import axiosInstance from "../../../../common/axiosInstance";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [disabled, setDisabled] = useState(false);

  const { id } = useParams();

  DocumentTitle("Edit Category");

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const fetchCategoryData = async () => {
    try {
      const response = await axiosInstance.get(`api/categories/${id}`);
      const categoryData = response.data;
      setData({
        name: categoryData.data.name,
        description: categoryData.data.description,
      });

      setImage(categoryData.data.image);
    } catch (error) {
      toast.error("Failed to fetch category data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      setDisabled(true);

      const response = await axiosInstance.put(
        `api/categories/${id}/update`,
        formData
      );

      if (response.data.success) toast.success("Category updated successfully");
      else toast.error(response.data.message);

      setDisabled(false);
    } catch (error) {
      toast.error("Failed to submit the form");
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (id) fetchCategoryData();
  }, []);

  return (
    <div className="update-category-page">
      <div className="list-header">
        <span className="title">Edit Category</span>
      </div>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="update-image-upload flex-col">
          <p>
            Upload Image <span className="requiredStar">*</span>
          </p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? typeof image === "string"
                    ? `${import.meta.env.VITE_CLOUDINARY_BASE_URL}${image}`
                    : URL.createObjectURL(image)
                  : assets.upload_area
              }
              alt="Upload Icon"
            />
          </label>

          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
          />
        </div>

        <div className="update-category-name">
          <div className="flex-col">
            <p>
              Category Name <span className="requiredStar">*</span>
            </p>
            <input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              type="text"
              placeholder="Example: Desserts"
              name="name"
              id="name"
              required
            />
          </div>
        </div>

        <div className="update-category-description">
          <div className="flex-col">
            <p>
              Category Description <span className="requiredStar">*</span>
            </p>
            <textarea
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description}
              name="description"
              id="description"
              rows="6"
              placeholder="Enter category description"
            ></textarea>
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
