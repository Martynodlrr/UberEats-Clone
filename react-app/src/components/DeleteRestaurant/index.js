import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as restaurantActions from '../../store/restaurant';
import './DeleteRestaurant.css';

export default function DeleteRestaurant(props) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    restaurantId = props;

    const restaurantDelete = (e, restaurantId) => {
        e.preventDefault();
        dispatch(restaurantActions.deleteRestaurant(restaurantId));
        closeModal();
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to remove this restaurant from your list?</h2>
            <button onClick={(e) => restaurantDelete(e, restaurantId)} id='deleteButton'>Yes (Delete Restaurant)</button>
            <button onClick={closeModal} id='dontDeleteButton'>No (Keep Restaurant)</button>
        </>
    )
}
