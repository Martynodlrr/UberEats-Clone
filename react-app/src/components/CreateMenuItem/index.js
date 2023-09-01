import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as menuActions from '../../store/menuItems';
import './index.css';

export default function CreateMenuItem({ menuItem, formType}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const restaurantId = useSelector(state=> state.restaurants.restaurant.id)
    const [name, setName] = useState(formType === 'Update Menu Item' ? menuItem.name : '');
    const [price, setPrice] = useState(formType === 'Update Menu Item' ? menuItem.price : '');
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [calories, setCalories] = useState(formType === 'Update Menu Item' ? menuItem.calories : '');
    let menuId=null
    if(menuItem){
        menuId = menuItem.id
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            name,
            price:Number(price),
            image,
            calories:Number(calories),
            restaurant_id: restaurantId
        }

        if (restaurantId) {
            newItem.restaurant_id = restaurantId
        }

        if (formType === 'Update Menu Item') {
            dispatch(menuActions.updateMenuItem(newItem,menuId))
            .then(()=>{
                closeModal()
            })
            .catch((e)=>{
                console.error("Error making menu item: ",e)
            })
        } else {
            dispatch(menuActions.createMenuItem(newItem, restaurantId))
                .then(()=>{
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
        <label htmlFor="name">Update the Name</label>
      ) : (
        <label htmlFor="name">Menu Item Name</label>
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
        <label htmlFor="price">Update the Price</label>
      ) : (
        <label htmlFor="price">Enter the Price</label>
      )}
      <input
        id="price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        placeholder="Price"
      />
    </div>
    <div className="form-group">
      {formType === 'Update Menu Item' ? (
        <label htmlFor="image">Update the Image</label>
      ) : (
        <label htmlFor="image">Upload an Image</label>
      )}
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required={!formType === 'Update Menu Item'}
      />
    </div>
    {imageLoading && <p>Loading...</p>}
    <div className="form-group">
      {formType === 'Update Menu Item' ? (
        <label htmlFor="calories">Update the Calories</label>
      ) : (
        <label htmlFor="calories">Menu Item Calories</label>
      )}
      <input
        id="calories"
        type="number"
        onChange={(e) => setCalories(e.target.value)}
        value={calories}
        placeholder="Calories"
      />
    </div>
    {formType === 'Update Menu Item' ? (
      <button type="submit" className="form-submit" id="updateSubmit">
        Update your Menu Item
      </button>
    ) : (
      <button type="submit" className="form-submit" id="createSubmit">
        Create Menu Item
      </button>
    )}
  </form>
</div>

        </>
    )
};
