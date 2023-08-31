import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import CreateRestaurant from "../CreateRestaurant";
import OpenModalImage from "../OpenModalImage";
import UserMenuModal from "../UserMenuModal";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = user;



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




  return (
    <>
      {sessionUser && (
        <>
          <OpenModalImage
              modalId='user-menu-modal'
              modalComponent={<UserMenuModal user={user}/>}
            />

        </>
      )}
    </>
  )
}

export default ProfileButton;
