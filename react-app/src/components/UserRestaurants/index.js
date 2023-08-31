import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import * as restaurantActions from '../../store/restaurant';
import OpenModalButton from "../OpenModalButton";
import DeleteRestaurant from "../DeleteRestaurant";
import UpdateRestaurant from "../UpdateRestaurant";
import CreateRestaurant from "../CreateRestaurant";
import './UserRestaurants.css';

export default function ManageRestaurants() {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurants.restaurants);
    const { userId } = useParams();


    useEffect(() => {
        dispatch(restaurantActions.userRestaurants(userId));
    }, [dispatch]);

    if (restaurants === undefined) return null;
    return (
        <>
            <h1>Manage Restaurants</h1>
            {Object.keys(restaurants).length > 0 ? (
                <>
                    <ul>
                        {Object.values(restaurants).map((restaurant) => (
                            <li key={restaurant.id} className='restaurantList'>
                                <NavLink to={`/restaurant/${restaurant.id}`}>
                                    <img src={restaurant.image} alt='a preview of the restaurant' title={restaurant.name}></img>
                                    <div>{restaurant.name}</div>
                                    <div>{restaurant.address}</div>
                                </NavLink>
                                <OpenModalButton
                                    buttonText='Update'
                                    modalComponent={<UpdateRestaurant restaurantId={restaurant.id} />}
                                />
                                <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<DeleteRestaurant restaurantId={restaurant.id} />}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <div>Looks like you don't have any restaurants! Create one here:</div>
                    <OpenModalButton
                        buttonText='Create a new restaurant'
                        modalComponent={<CreateRestaurant />}
                    />
                </>
            )}
        </>
    )
}
