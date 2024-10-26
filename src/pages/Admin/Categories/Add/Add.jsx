import { useContext, useState } from 'react';
import { assets } from '../../../../assets/admin/assets';
import './Add.css';
import { toast } from 'react-toastify';
import DocumentTitle from '../../../../common/documentTitle';
import { StoreContext } from '../../../../context/StoreContext';
import axiosInstance from '../../../../common/axiosInstance';

const Add = () => {
  const { API_BASE_URL } = useContext(StoreContext);

  const [disabled, setDisabled] = useState(false);

  DocumentTitle('Add Category');

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', image);

    try {
      setDisabled(true);
      const response = await axiosInstance.post(
        `${API_BASE_URL}api/categories/add`,
        formData,
      );

      if (response.data.success) {
        setData({
          name: '',
          description: '',
        });
        setImage(false);
        toast.success(response.data.message);
      } else toast.error(response.data.message);

      setDisabled(false);
    } catch (error) {
      toast.error('Failed to submit the form');
      setDisabled(false);
    }
  };

  return (
    <div className="add-category-page">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
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
            required
          />
        </div>

        <div className="add-category-name">
          <div className="flex-col">
            <p>Category Name</p>
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

        <div className="add-category-description">
          <div className="flex-col">
            <p>Category Description</p>
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

        <button type="submit" className="add-button" disabled={disabled}>
          {disabled ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default Add;
