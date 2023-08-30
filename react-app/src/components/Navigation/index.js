import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoTrashBinSharp } from 'react-icons/io5';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import ShoppingCartModal from '../shoppingCartModal'
import './Navigation.css';

function Navigation({ isLoaded }) {

	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.session.shoppingCart);
	const [showCart, setShowCart] = useState(false)
	const [cartTotal, setCartTotal] = useState(0)
	const history = useHistory();

	const handleRedirect = () => {
		history.push('/');
	};

	const handleLogout = () => {
		dispatch(logout())
	}
	let total = 0

	return (
		<ul id='navigation'>

			<a id='logo' onClick={() => handleRedirect()} ><p id='logo-hello'>Hello</p><p id='logo-eats'>Eats</p></a>
			<button id='current-address'>Current Address</button>
			<button id='cart-button' onClick={() => setShowCart(!showCart)}><img id='cart-icon' src='/images/cart.png' />Cart · {cart ? Object.values(cart).length === 0 ? 0 : Object.values(cart).length - 1 : 0}</button>
			{
				showCart && <div id='cart-dropdown'>
					{
						cart && Object.values(cart).map((item) => {
							if (typeof item === 'number') return null
							total += item.price
							return <li className='cart-list'>
								<h4>{item.name}</h4> <p>${item.price}</p>
							</li>
						})
					}
					<div > {sessionUser && cart.restaurantId !== 0 && cart.restaurantId ?
						<OpenModalButton
							buttonText={<IoTrashBinSharp />}
							modalComponent={<ShoppingCartModal
								state='clearCartButton' />}
						/> : null}
					</div>
					<h4 id='total'>Total:{total}</h4>
				</div>
			}
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</ul>
	);
}

export default Navigation;
