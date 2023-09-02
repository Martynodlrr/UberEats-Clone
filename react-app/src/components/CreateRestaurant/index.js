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
                    closeModal()
                    history.push(`/restaurant/${restaurant.id}`)

                })
                .catch((e) => {
                    console.error("Error making restaurant: ", e)
                })
        } else {
            dispatch(restaurantActions.createRestaurant(newRestaurant))
                .then((data) => {
                    console.log(data)
                    closeModal()
                    history.push(`/restaurant/${data.id}`)

                })
                .catch((e) => {
                    console.error("Error making restaurant: ", e)
                })
        }
    }

    return (
        <>
            <div className="restaurant-form-container">
                {formType === 'Update Restaurant' ? (
                    <h1 className="form-heading">Update your Restaurant</h1>
                ) : (
                    <h1 className="form-heading">Create a New Restaurant</h1>
                )}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="description" className='create-restaurant-label'>
                            Restaurant Description
                            <textarea
                                className='create-resturant-input'
                                id="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Description"
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        {formType === 'Update Restaurant' ? (
                            <label htmlFor="category" className='create-restaurant-label'>Update the Category</label>
                        ) : (
                            <label htmlFor="category" className='create-restaurant-label'>Select a Category</label>
                        )}
                        <select
                            className='create-resturant-input'
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
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
                    </div>
                    <div className="form-group">
                        {formType === 'Update Restaurant' ? (
                            <label htmlFor="address" className='create-restaurant-label'>Update the Address</label>
                        ) : (
                            <label htmlFor="address" className='create-restaurant-label'>Restaurant Address</label>
                        )}
                        <input
                            id="address"
                            className='create-resturant-input'
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            placeholder="Address"
                        />
                    </div>
                    <div className="form-group">
                        {formType === 'Update Restaurant' ? (
                            <label htmlFor="image" className='create-restaurant-label'>Update the Image</label>
                        ) : (
                            <label htmlFor="image" className='create-restaurant-label'>Upload an Image</label>
                        )}
                        <input
                            id="image"
                            className='create-resturant-input'
                            type="file"
                            accept="image/*"
                            onChange={(e) => {console.log(e.target.files[0]);setImage(e.target.files[0])}}
                            required={!formType === 'Update Restaurant'}
                        />
                    </div>
                    {imageLoading && <p>Loading...</p>}
                    <div className="form-group">
                        {formType === 'Update Restaurant' ? (
                            <label htmlFor="name" className='create-restaurant-label'>Update the Name</label>
                        ) : (
                            <label htmlFor="name" className='create-restaurant-label'>Restaurant Name</label>
                        )}
                        <input
                            id="name"
                            className='create-resturant-input'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name"
                        />
                    </div>
                    {formType === 'Update Restaurant' ? (
                        <button type="submit" className="form-submit" id="updateSubmit">
                            Update your Restaurant
                        </button>
                    ) : (
                        <button type="submit" className="form-submit" id="createSubmit">
                            Create Restaurant
                        </button>
                    )}
                </form>
            </div>

        </>
    )
};
