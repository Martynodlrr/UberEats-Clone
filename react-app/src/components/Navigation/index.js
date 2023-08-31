import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import ProfileButton from './ProfileButton';
import ShoppingCartModal from '../shoppingCartModal'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import UserMenuModal from '../UserMenuModal';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.session.shoppingCart);
	const history = useHistory();

	const handleRedirect = () => {
		history.push('/');
	};


	return (
		<ul id='navigation'>
			<div id='logo-menu'>
			{isLoaded && <ProfileButton user={sessionUser} />}
			<img src='/images/brad-eats.png' id='logo' onClick={() => handleRedirect()} />

			</div>

			<button id='current-address'>Current Address</button>
			<OpenModalButton
				modalComponent={<ShoppingCartModal />}
				buttonText={
					<>
						<p className='cart-button'><img id='cart-icon' src='/images/cart.png' alt='Cart Icon' /> Cart · {cart ? Object.values(cart).length === 0 ? 0 : Object.values(cart).length - 1 : 0}</p>
					</>
				}
				className="cart-container"
			/>
			{!sessionUser && <div id='login-signup-buttons-container'>
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
        </div>}
				
		</ul>
	);
}

export default Navigation;
