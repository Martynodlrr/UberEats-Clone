import { useSelector } from 'react-redux';
import CreateRestaurant from '../CreateRestaurant';

export default function UpdateRestaurant({ restaurant }) {
    return (
        <CreateRestaurant restaurant={restaurant} formType='Update Restaurant' />
    )
}
