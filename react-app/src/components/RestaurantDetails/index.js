import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as restaurantActions from '../../store/restaurant'
import * as reviewActions from '../../store/review'
import * as menuItemActions from '../../store/menuItems'
import * as cartActions from '../../store/session'
import ShoppingCartModal from '../shoppingCartModal'
import LoginFormModal from '../LoginFormModal'
import OpenModalButton from "../OpenModalButton";
import Reviews from '../Reviews'
import './index.css'

export default function RestaurantDetails() {


    const params = useParams()

    const id = params.restaurantId

    const dispatch = useDispatch()

    const restaurant = useSelector(state => state.restaurants.restaurant)

    const user = useSelector(state => state.session.user)

    const cart = useSelector(state => state.session.shoppingCart)

    const reviews = useSelector(state => state.reviews.reviews)

    const items = useSelector(state => state.menuItems.menuItems)

    let nestedArrays = [];

    useEffect(() => {
        dispatch(restaurantActions.oneRestaurant(id))
        dispatch(reviewActions.allReviewsbyRestaurant(id))
        dispatch(menuItemActions.allMenuItems(id))

        if ( cart && cart[1] && cart.restaurantId === 0) dispatch(cartActions.getRestaurantId(cart[1].menu_item_id))
    }, [dispatch])


    if (Object.values(items)) {
        for (let i = 0; i < Object.values(items).length; i += 4) {
            let nestedArray = Object.values(items).slice(i, i + 4);
            nestedArrays.push(nestedArray);
        }
    }

    return (
        <div id='restaurant-details'>
            <img id='restaurant-banner' src={restaurant && restaurant.image} />
            <div>
                <h1>{restaurant && restaurant.name}</h1>
                <p>Ratings - <a href="#review-container">See all reviews</a></p>
            </div>
            <div>
                {
                    nestedArrays.map((arr) => {
                        return <div className='item-row'>
                            {
                                arr.map((item) => {
                                    return <div className='item-card'>
                                        <div>
                                            {cart && cart.restaurantId !== restaurant.id && Object.values(cart).length >= 2 ?
                                                <OpenModalButton
                                                    modalComponent={<ShoppingCartModal
                                                        state='confirmation'
                                                        item={item}
                                                        restaurant={restaurant} />}
                                                    buttonText={
                                                        <img className='add-item' src="/images/add-item.png" alt="Add item button" />
                                                    }
                                                    className="image-button"
                                                />
                                                :
                                                !user ?
                                                    <OpenModalButton
                                                        modalComponent={<LoginFormModal />}
                                                        className="image-button"
                                                        buttonText={
                                                            <img className='add-item' src="/images/add-item.png" alt="Add item button" />
                                                        }
                                                    />
                                                    :
                                                    <button className="image-button" onClick={() => {
                                                        dispatch(cartActions.addShoppingCartItem({ menu_item_id: item.id }, user.id, restaurant.id))
                                                    }
                                                    }>
                                                        <img className='add-item' src="/images/add-item.png" alt="Add item button" />
                                                    </button>
                                            }

                                            <img className='item-image' src={item.image} />
                                        </div>
                                        <p className='item-name'>{item.name}</p>
                                        <p className='item-price'>${item.price}</p>
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
            <div id='review-container'>
                <h1>Reviews</h1>
                <Reviews reviews={Object.values(reviews)} userId={user ? user.id : 0} />
            </div>
        </div>
    )
}
