import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import CreateRestaurant from "../CreateRestaurant";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  const sessionUser = user;

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {sessionUser ? (
        <>
          <button onClick={openMenu} className="profileButton">
            <GiHamburgerMenu />
          </button>
          <ul className={ulClassName} ref={ulRef}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
            <hr />
            <li><OpenModalButton
              buttonText="Add your restaurant"
              className="createRestaurantButton"
              modalComponent={<CreateRestaurant />}
            />
            </li>
            <li>
              <NavLink to={`/restaurants/user/${sessionUser.id}`} className="manageLink">Manage your restaurants</NavLink>
            </li>
          </ul >
        </>
      ) : (
        <div id='login-signup-buttons-container'>
          <OpenModalButton
            buttonText="Log In"
            className='login-signup'
            modalComponent={<LoginFormModal />}
          />
          <OpenModalButton
            buttonText="Sign Up"
            className='login-signup'
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </>
  )
}

export default ProfileButton;
