import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import CreateRestaurant from "../CreateRestaurant";
import { NavLink ,useHistory} from "react-router-dom";
import { useModal } from '../../context/Modal';
import './index.css'
import { useEffect } from "react";

export default function UserMenuModal({user}) {

    const dispatch = useDispatch()
    const history = useHistory()

    const { closeModal } = useModal()

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());

        closeModal()
        history.push("/")
        // const menu = document.getElementById('user-menu-modal')
        // menu.style.left = '-250px'
      };


      useEffect(() => {
        const menu = document.getElementById('user-menu-modal')
            menu.style.left = '0px'

      },[])



    return (
        <ul id='user-menu-modal'>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div><OpenModalButton
              buttonText="Add your restaurant"
              className="createRestaurantButton"
              modalComponent={<CreateRestaurant />}
            />
            </div>
            <div>
              <NavLink to={`/restaurants/user/${user.id}`} className="manageLink">Manage your restaurants</NavLink>
            </div>

            <div>
              <p id='logout-button' onClick={handleLogout}>Log Out</p>
            </div>
          </ul >


    )
}
