import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as menuActions from '../../store/menuItems';
import './index.css';

export default function DeleteMenuItem({ menuItemId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const menuItemDelete = (e, menuItemId) => {
        e.preventDefault();
        dispatch(menuActions.deleteMenuItem(menuItemId));
        closeModal();
    };

    return (
        <>
            <div id='menuItemDelete'>
                <h1>Confirm Delete</h1>
                <h2 id='confirmBlurb'>Are you sure you want to remove this menu item?</h2>
                <button onClick={(e) => menuItemDelete(e, menuItemId)} id='deleteButton'>Yes (Delete Menu Item)</button>
                <button onClick={closeModal} id='dontDeleteButton'>No (Keep Menu Item)</button>
            </div>
        </>
    )
}
