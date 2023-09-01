import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as restaurantActions from '../../store/restaurant';
import './CreateRestaurant.css';

export default function CreateRestaurant({ restaurant, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState(formType === 'Update Restaurant' ? restaurant.description : '');
    const [category, setCategory] = useState(formType === 'Update Restaurant' ? restaurant.category : 'grocery');
    const [address, setAddress] = useState(formType === 'Update Restaurant' ? restaurant.address : '');
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [name, setName] = useState(formType === 'Update Restaurant' ? restaurant.name : '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRestaurant = {
            description,
            category,
            address,
            image,
            name,
            userId: user.id
        }

        if (formType === 'Update Restaurant') {
            dispatch(restaurantActions.updateRestaurant(newRestaurant, restaurant.id))
                .then(() => {
                    closeModal();
                    history.push(`/restaurant/${restaurant.id}`)
                })
                .catch((e) => {
                    console.error("Error making restaurant: ", e)
                })
        } else {
            dispatch(restaurantActions.createRestaurant(newRestaurant))
                .then(() => {
                    history.push(`/restaurant/${restaurant.id}`)
                })
                .catch((e) => {
                    console.error("Error making restaurant: ", e)
                })
        }
    }

    return (
        <>
            {formType === 'Update Restaurant' ? <h1>Update your Restaurant</h1> : <h1>Create a New Restaurant</h1>}
            <form onSubmit={handleSubmit}
                encType="multipart/form-data">
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
                    {formType === 'Update Restaurant' ? <p>Update the category?</p> : <p>Please select a category for your restaurant</p>}
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
                    {formType === 'Update Restaurant' ? <p>Update the address?</p> : <p>What is the address for your restaurant?</p>}
                    <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder='Address'
                    />
                </label>
                <label>
                    {formType === 'Update Restaurant' ? <p>Upload an image if you wish to update the picture</p> : <p>Please upload an image for your restaurant</p>}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required={formType !== 'Update Restaurant' ? true : false}
                    />
                </label>
                {(imageLoading) && <p>Loading...</p>}
                <label>
                    {formType === 'Update Restaurant' ? <p>Update the name?</p> : <p>What is the name of your restaurant?</p>}
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
