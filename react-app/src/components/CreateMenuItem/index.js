import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as menuActions from '../../store/menuItems';
import './index.css';

export default function CreateMenuItem({ menuItem, formType }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const restaurantId = useSelector(state => state.restaurants.restaurant.id)
  const [name, setName] = useState(formType === 'Update Menu Item' ? menuItem.name : '');
  const [price, setPrice] = useState(formType === 'Update Menu Item' ? menuItem.price : '');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [calories, setCalories] = useState(formType === 'Update Menu Item' ? menuItem.calories : '');
  const [errors, setErrors] = useState({});

  let menuId = null
  if (menuItem) {
    menuId = menuItem.id
  }

  useEffect(() => {
    const errors = {};

    if (name.length < 3 || name.length > 60) {
      errors.name = 'Name must be between 3 and 60 characters.'
    };
    if (price < 0) {
      errors.price = 'Price cannot be negative.'
    };
    if (image === null) {
      errors.image = 'Please upload an image.'
    };
    if (calories < 1) {
      errors.calories = 'Calories must be greater than 0.'
    }

    setErrors(errors);
  }, [name, price, image, calories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      name,
      price: Number(price),
      image,
      calories: Number(calories),
      restaurant_id: restaurantId
    }

    if (restaurantId) {
      newItem.restaurant_id = restaurantId
    }

    if (formType === 'Update Menu Item') {
      dispatch(menuActions.updateMenuItem(newItem, menuId))
        .then(() => {
          closeModal()
        })
        .catch((e) => {
          console.error("Error making menu item: ", e)
        })
    } else {
      dispatch(menuActions.createMenuItem(newItem, restaurantId))
        .then(() => {
          closeModal()
        })
        .catch((e) => {
          console.error("Error making menu item: ", e)
        })
    }
    setName("");
    setPrice("");
    setCalories("");
    setImage("")

  };

  return (
    <>
      <div className="menu-item-form-container">
        {formType === 'Update Menu Item' ? (
          <h1 className="form-heading">Update your Menu Item</h1>
        ) : (
          <h1 className="form-heading">Create a New Menu Item</h1>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            {formType === 'Update Menu Item' ? (
              <label htmlFor="name" className='create-item-form'>Update the Name {errors.name && <p className="errors">{errors.name}</p>}</label>
            ) : (
              <label htmlFor="name" className='create-item-form'>Menu Item Name {errors.name && <p className="errors">{errors.name}</p>}</label>
            )}
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            {formType === 'Update Menu Item' ? (
              <label htmlFor="price">Update the Price {errors.price && <p className="errors">{errors.price}</p>}</label>
            ) : (
              <label htmlFor="price">Enter the Price {errors.price && <p className="errors">{errors.price}</p>}</label>
            )}
            <input
              id="price"
              className='create-item-input'
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            {formType === 'Update Menu Item' ? (
              <label htmlFor="image" className='create-item-form'>Update the Image</label>
            ) : (
              <label htmlFor="image" className='create-item-form'>Upload an Image</label>
            )}
            <input
              id="image"
              className='create-item-input'
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required={!formType === 'Update Menu Item'}
            />
          </div>
          {errors.image && <p className="errors">{errors.image}</p>}
          {imageLoading && <p>Loading...</p>}
          <div className="form-group">
            {formType === 'Update Menu Item' ? (
              <label htmlFor="calories" className='create-item-form'>Update the Calories {errors.calories && <p className="errors">{errors.calories}</p>}</label>
            ) : (
              <label htmlFor="calories" className='create-item-form'>Menu Item Calories {errors.calories && <p className="errors">{errors.calories}</p>}</label>
            )}
            <input
              id="calories"
              className='create-item-input'
              type="number"
              onChange={(e) => setCalories(e.target.value)}
              value={calories}
              placeholder="Calories"
            />
          </div>
          {formType === 'Update Menu Item' ? (
            <button type="submit" className="form-submit" id="updateSubmit" disabled={name.length < 3 || name.length > 60 || price < 0 || image === null || calories < 1}>
              Update your Menu Item
            </button>
          ) : (
            <button type="submit" className="form-submit" id="createSubmit" disabled={name.length < 3 || name.length > 60 || price < 0 || image === null || calories < 1}>
              Create Menu Item
            </button>
          )}
        </form>
      </div>

    </>
  )
};
