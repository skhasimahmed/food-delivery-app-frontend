import { useContext, useState } from "react";
import { assets } from "../../../../assets/admin/assets";
import "./Add.css";
import { toast } from "react-toastify";
import DocumentTitle from "../../../../common/documentTitle";
import { StoreContext } from "../../../../context/StoreContext";
import axiosInstance from "../../../../common/axiosInstance";

const Add = () => {
  const { API_BASE_URL } = useContext(StoreContext);

  const [disabled, setDisabled] = useState(false);

  DocumentTitle("Add Food");

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      setDisabled(true);
      const response = await axiosInstance.post(
        `${API_BASE_URL}api/food/add`,
        formData
      );

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else toast.error(response.data.message);

      setDisabled(false);
    } catch (error) {
      toast.error("Failed to submit the form");
      setDisabled(false);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-image-upload flex-col">
          <p>Upload Image <span className="requiredStar">*</span></p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Icon"
            />
          </label>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name">
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

        <div className="add-product-description">
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

        <div className="add-category-price">
          <div className="add-category flex-col">
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
          <div className="add-price flex-col">
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
        <button type="submit" className="add-button" disabled={disabled}>
          {disabled ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
