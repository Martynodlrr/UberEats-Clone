import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {

	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.session.shoppingCart);
	const [showCart, setShowCart] = useState(false)


	console.log(sessionUser)

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<ul id='navigation'>

			<a href="/" id='logo'><p id='logo-hello'>Hello</p><p id='logo-eats'>Eats</p></a>

			<button id='current-address'>Current Address</button>
			<button id='cart-button' onClick={() => setShowCart(!showCart)}><img id='cart-icon' src='/images/cart.png' />Cart · {cart && Object.values(cart).length}</button>
			{
				showCart && <div id='cart-dropdown'>
					{
						cart && Object.values(cart).map((item) => {
							return <li className='cart-list'>
								<p>something</p>
							</li>
						})
					}
				</div>
			}

			{
				sessionUser && <button id='logout' onClick={handleLogout}>Logout ;( </button>
			}

			{isLoaded && !sessionUser && (
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
		</ul>
	);
}

export default Navigation;
