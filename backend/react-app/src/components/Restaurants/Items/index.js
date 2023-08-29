import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css'

export default function Restaurant(id) {
  const restaurantObj = useSelector((state) => state[id]);

  return !Object.keys(restaurantObj).length ? null : (
    <div id='restaurant-details'>
      <img src={restaurantObj.imageUrl} alt={restaurantObj.name} />
      <p className='address'>{restaurantObj.address}</p>
      <p className='name'>{restaurantObj.name}</p>
      <p className='distance-info'>{restaurantObj.eTime} &middot; {restaurantObj.distance}</p>
      {restaurantObj.items.map((item) => (
        <div className='items'>
          <img src={item.url} alt={item.name} />
          <p>{ item.name }</p>
          <p>{ item.price }</p>
        </div>
            ))}
    </div>
  )
}
