import { useSelector } from 'react-redux';
import CreateRestaurant from '../CreateRestaurant';

export default function UpdateRestaurant() {
    const restaurant = useSelector((state) => state.restaurants.restaurant.id);

    return (
        <CreateRestaurant restaurant={restaurant} formType='Update Restaurant' />
    )
}
