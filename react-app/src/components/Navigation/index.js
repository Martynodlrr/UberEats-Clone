import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import ProfileButton from './ProfileButton';
import ShoppingCartModal from '../shoppingCartModal'
import OpenModalButton from "../OpenModalButton";
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.session.shoppingCart);
	const history = useHistory();

	const handleRedirect = () => {
		history.push('/');
	};

	const handleLogout = () => {
		dispatch(logout())
	}


	return (
		<ul id='navigation'>
			<img src='/images/brad-eats.png' id='logo' onClick={() => handleRedirect()} />
				
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
			{isLoaded && <ProfileButton user={sessionUser} />}
		</ul>
	);
}

export default Navigation;
