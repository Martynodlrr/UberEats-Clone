import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as restaurantActions from '../../store/restaurant';
import './CreateRestaurant.css';

export default function CreateRestaurant({ restaurant, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [description, setDescription] = useState(formType === 'Update Restaurant' ? restaurant.description : '');
    const [category, setCategory] = useState(formType === 'Update Restaurant' ? restaurant.category : '');
    const [address, setAddress] = useState(formType === 'Update Restaurant' ? restaurant.address : '');
    const [image, setImage] = useState(formType === 'Update Restaurant' ? restaurant.image : '');
    const [name, setName] = useState(formType === 'Update Restaurant' ? restaurant.name : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRestaurant = {
            description,
            category,
            address,
            image,
            name
        }

        if (formType === 'Update Restaurant') {
            const returnFromThunk = restaurantActions.updateRestaurant(newRestaurant);
            const dbRestaurant = await dispatch(returnFromThunk);
            if (dbRestaurant) {
                history.push(`/restaurants/${dbRestaurant.id}`)
            }
        } else {
            const returnFromThunk = restaurantActions.createRestaurant(newRestaurant);
            const dbRestaurant = await dispatch(returnFromThunk);

            if (dbRestaurant) {
                history.push(`/restaurants/${dbRestaurant.id}`)
            }
        }
    };
    return (
        <>
            {formType === 'Update Restaurant' ? <h1>Update your Restaurant</h1> : <h1>Create a New Restaurant</h1>}
            <form onSubmit={handleSubmit}>
                <label>
                    Please describe your restaurant
                    <input
                        type='textarea'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='Description'
                    />
                </label>
                <label>
                    Please select a category for your restaurant
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value='grocery'>Grocery</option>
                        <option value='convenience'>Convenience</option>
                        <option value='fastFood'>Fast Food</option>
                        <option value='alcohol'>Alcohol</option>
                        <option value='pharmacy'>Pharmacy</option>
                        <option value='baby'>Baby</option>
                        <option value='specialtyFoods'>Specialty Foods</option>
                        <option value='petSupplies'>Pet Supplies</option>
                        <option value='flowers'>Flowers</option>
                        <option value='retail'>Retail</option>
                        <option value='electronics'>Electronics</option>
                    </select>
                </label>
                <label>
                    What is the address for your restaurant?
                    <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder='Address'
                    />
                </label>
                <label>
                    Please upload an image for your restaurant
                    <input
                        type='text'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        placeholder='Image URL'
                    />
                </label>
                <label>
                    What is the name of your restaurant?
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder='Name'
                    />
                </label>
                {formType === 'Update Restaurant' ? <button type='submit' id='createSubmit'>Update your Restaurant</button> : <button type='submit' id='createSubmit'>Create Restaurant</button>}
            </form>
        </>
    )
};
