import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import * as restaurantActions from '../../store/restaurant.js';
import './index.css'

export default function Restaurants() {
  const allRestaurantsObj = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirect = (restaurant) => {
    history.push(`/restaurants/${restaurant.id}`);
  };

  useEffect(() => {
    dispatch(restaurantActions.allRestaurants());
  }, [dispatch]);

  return !Object.keys(allRestaurantsObj).length ? null : (
    <div id='restaurants'>
      {allRestaurantsObj.map((restaurant) => (
        <div
          id={restaurant.id}
          className='restaurants'
          onClick={() => handleRedirect(restaurant)}
        >
          <img src={restaurant.imageUrl} alt={restaurant.name} />
          <p className='address'>{restaurant.address}</p>
          <p className='name'>{restaurant.name}</p>
          <p className='distance-info'>{restaurant.eTime} &middot; {restaurant.distance}</p>
        </div>
      ))}
    </div>
  )
}
