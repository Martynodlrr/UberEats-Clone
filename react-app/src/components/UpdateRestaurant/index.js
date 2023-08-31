import { useSelector } from 'react-redux';
import CreateRestaurant from '../CreateRestaurant';

export default function UpdateRestaurant({ restaurant }) {
    console.log(restaurant)

    return (
        <CreateRestaurant restaurant={restaurant} formType='Update Restaurant' />
    )
}
