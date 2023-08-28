import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as restaurantActions from '../../store/restaurant'
import * as reviewActions from '../../store/review'
import * as menuItemActions from '../../store/menuItems'
import * as cartActions from '../../store/session'
import { useEffect } from 'react'
import Reviews from '../Reviews'
import './index.css'

export default function RestaurantDetails() {

    const params = useParams()

    const id = params.restaurantId

    const dispatch = useDispatch()

    const restaurant = useSelector(state => state.restaurants.restaurant)

    const user = useSelector(state => state.session.user)

    const reviews = useSelector(state => state.reviews.reviews)

    const items = useSelector(state => state.menuItems.menuItems)


    useEffect(() => {
        dispatch(restaurantActions.oneRestaurant(id))
        dispatch(reviewActions.allReviewsbyRestaurant(id))
        dispatch(menuItemActions.allMenuItems(id))
    }, [dispatch])

    console.log(reviews)

    let nestedArrays = [];

    if (Object.values(items)) {

        for (let i = 0; i < Object.values(items).length; i += 4) {
          let nestedArray = Object.values(items).slice(i, i + 4);
          nestedArrays.push(nestedArray);
        }

        console.log(nestedArrays)
    }



    return (
        <div id='restaurant-details'>
            <img id='restaurant-banner' src={restaurant && restaurant.image} />
            <div>
                <h1>{restaurant && restaurant.name}</h1>
                <p>Ratings - See all reviews</p>
            </div>
            <div>
                {
                    nestedArrays.map((arr) => {
                        return <div className='item-row'>
                            {
                                arr.map((item) => {
                                    return <div className='item-card'>
                                        <div>
                                            <img className='add-item' src='/images/add-item.png' onClick={() => dispatch(cartActions.addShoppingCartItem({menu_item_id: item.id}, user.id))}/>
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
                <Reviews reviews={Object.values(reviews)} userId={user ? user.id : 0}/>
            </div>
        </div>
    )
}
