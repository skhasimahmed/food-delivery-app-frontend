import { useContext, useEffect, useState } from "react";
import { assets } from "../../../../assets/admin/assets";
import "./Edit.css";
import { toast } from "react-toastify";
import DocumentTitle from "../../../../common/documentTitle";
import { StoreContext } from "../../../../context/StoreContext";
import axiosInstance from "../../../../common/axiosInstance";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [updating, setUpdating] = useState(false); // State for disabled form fields

  const { API_BASE_URL } = useContext(StoreContext);

  DocumentTitle("Edit Food");

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_BASE_URL}api/food/${id}/get`
        );
        const foodData = response.data;
        setData({
          name: foodData.data.name,
          description: foodData.data.description,
          category: foodData.data.category,
          price: foodData.data.price,
        });

        setImage(foodData.data.image);
      } catch (error) {
        toast.error("Failed to load food data.");
      }
    };

    if (id) {
      fetchFoodData();
    }
  }, [id, API_BASE_URL]);

  const handleSubmit = async (e) => {
    setUpdating(true);

    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      if (id) {
        const response = await axiosInstance.put(
          `${API_BASE_URL}api/food/${id}/update`,
          formData
        );
        if (response.data.success) {
          toast.success("Food item updated successfully!");
        } else {
          toast.error(response.data.message);
        }
      }
      setUpdating(false);
    } catch (error) {
      toast.error("Failed to submit the form.");
      setUpdating(false);
    }
  };

  return (
    <div className="edit">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="edit-image-upload flex-col">
          <p>Upload Image <span className="requiredStar">*</span></p>
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
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>

        <div className="edit-product-name">
          <div className="flex-col">
            <p>Product Name <span className="requiredStar">*</span></p>
            <input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              type="text"
              placeholder="Biryani"
              name="name"
              id="name"
            />
          </div>
        </div>

        <div className="edit-product-description">
          <div className="flex-col">
            <p>Product Description <span className="requiredStar">*</span></p>
            <textarea
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description}
              name="description"
              id="description"
              rows="6"
              placeholder="Biryani at ₹99 only"
            ></textarea>
          </div>
        </div>

        <div className="edit-category-price">
          <div className="edit-category flex-col">
            <p>Category <span className="requiredStar">*</span></p>
            <select
              name="category"
              id="category"
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="edit-price flex-col">
            <p>Price <span className="requiredStar">*</span></p>
            <input
              type="number"
              placeholder="₹ 99"
              name="price"
              id="price"
              step="0.1"
              min="0"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </div>
        </div>
        <button type="submit" className="edit-button" disabled={updating}>
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Edit;
