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
import DeleteMenuItem from '../DeleteMenuItemModal'
import Reviews from '../Reviews'
import CreateMenuItem from '../CreateMenuItem'
import CreateReview from '../CreateReview'
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

        if (cart && cart.length && cart.restaurantId === 0) dispatch(cartActions.getRestaurantId(cart[1].menu_item_id))
    }, [dispatch])

    // populates menu item array? not sure what nestedArray does lol
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
            {/* Create new menu item only if user is the owner of the restaurant */}
            {user && restaurant && user.id === restaurant.user_id ?
                <div className="create-menu-item-container" >
                    <OpenModalButton
                        modalComponent={<CreateMenuItem />}
                        className="create-menu-item-button"
                        buttonText={"Create new Item"}
                    />
                </div>
                : null
            }
            <div>
                {
                    nestedArrays.map((arr) => {
                        return <div className='item-row'>
                            {
                                arr.map((item) => {
                                    return <div className='item-card'>
                                        <div>
                                            {Object.values(cart).length && Object.values(cart)[0].restaurant_id !== restaurant.id && user && restaurant && Object.values(cart).length >= 2 && user.id !== restaurant.user_id ?
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
                                                    user && restaurant && user.id !== restaurant.user_id ?

                                                        <button className="image-button" onClick={() => {
                                                            dispatch(cartActions.addShoppingCartItem({ menu_item_id: item.id }, user.id, restaurant.id))
                                                        }
                                                        }>
                                                            <img className='add-item' src="/images/add-item.png" alt="Add item button" />
                                                        </button>
                                                        :
                                                        // ONLY IF USER IS OWNER OF RESTAURANT
                                                        <div>
                                                            {/* Delete */}
                                                            <OpenModalButton
                                                                modalComponent={<DeleteMenuItem menuItemId={item.id} />}
                                                                className="delete-menu-item-btn"
                                                                buttonText={
                                                                    "Delete Item"
                                                                }
                                                            />
                                                            {/* Update */}
                                                            <OpenModalButton
                                                                modalComponent={<CreateMenuItem menuItem={item} formType={"Update Menu Item"} />}
                                                                className="update-menu-item-btn"
                                                                buttonText={"Update Item"}
                                                            />
                                                        </div>
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
                <div >

                <h1>Reviews</h1>
                {user &&
                <OpenModalButton
                    buttonText="Write a Review"
                    className='write-review'
                    modalComponent={<CreateReview userId={user.id} />}
                />}
                </div>
                <Reviews reviews={Object.values(reviews)} userId={user ? user.id : 0} />
            </div>
        </div>
    )
}
