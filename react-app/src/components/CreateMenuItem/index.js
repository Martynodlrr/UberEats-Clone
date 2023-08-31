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
    const [image, setImage] = useState(formType === 'Update Menu Item' ? menuItem.image : '');
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

        if (formType === 'Update Menu Item') {
            dispatch(menuActions.updateMenuItem(newItem,menuId))
            .then(()=>{
                closeModal()
            })
            .catch((e)=>{
                console.error("Error making menu item: ",e)
            })
        } else {
            dispatch(menuActions.createMenuItem(newItem,restaurantId))
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
            {formType === 'Update Menu Item' ? <h1>Update your Menu Item</h1> : <h1>Create a New Menu Item</h1>}
            <form onSubmit={handleSubmit}>
            <label>
                    What is the name of your Menu Item?
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder='Name'
                    />
                </label>
                <label>
                    Please enter the price of your Menu Item
                    <input
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder='Price'
                    />
                </label>
                <label>
                    Please upload an image for your menu item
                    <input
                        type='text'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        placeholder='Image URL'
                    />
                </label>
                <label>
                    How many calories does your menu item have?
                    <input
                        type='number'
                        onChange={(e) => setCalories(e.target.value)}
                        value={calories}
                        placeholder='Calories'
                    />
                </label>


                {formType === 'Update Menu Item' ? <button type='submit' id='createSubmit'>Update your Menu Item</button> : <button type='submit' id='createSubmit'>Create Menu Item</button>}
            </form>
        </>
    )
};
