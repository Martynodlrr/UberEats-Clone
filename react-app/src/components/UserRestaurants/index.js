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
    const restaurants = useSelector((state) => state.restaurants.userRestaurants);
    const { userId } = useParams();

    useEffect(() => {
        dispatch(restaurantActions.userRestaurants(userId));
    }, [dispatch]);

    if (restaurants === undefined) return null;
    return (
        <>
           <div className="manage-restaurants-container">
  <h1>Manage Restaurants</h1>
  {Object.keys(restaurants).length > 0 ? (
    <ul className="restaurant-list">
      {Object.values(restaurants).map((restaurant) => (
        <li key={restaurant.id}>
          <NavLink id='restaurant-name-link'to={`/restaurant/${restaurant.id}`}>
            <img src={restaurant.image} alt="Preview of the restaurant" title={restaurant.name} />
            <div className="restaurant-details">
              <div>{restaurant.name}</div>
              <div>{restaurant.address}</div>
            </div>
          </NavLink>
          <div>
            <OpenModalButton
              buttonText="Update"
              modalComponent={<UpdateRestaurant restaurant={restaurant} />}
              className="action-button"
            />
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteRestaurant restaurantId={restaurant.id} />}
              className="action-button"
            />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div>
      <p>Looks like you don't have any restaurants! Create one here:</p>
      <OpenModalButton
        buttonText="Create a new restaurant"
        modalComponent={<CreateRestaurant />}
        className="action-button"
      />
    </div>
  )}
</div>

        </>
    )
}
