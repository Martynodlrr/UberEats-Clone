import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as restaurantActions from '../../store/restaurant'
import * as reviewActions from '../../store/review'
import './index.css'
import { useEffect } from 'react'

export default function RestaurantDetails() {

    const params = useParams()

    const id = params.restaurantId

    const dispatch = useDispatch()

    const restaurant = useSelector(state => state.restaurants.restaurant)

    const reviews = (useSelector(state => state.reviews.reviews))


    useEffect(() => {
        dispatch(restaurantActions.oneRestaurant(id))
    }, [dispatch])
    useEffect(() => {
        console.log('yoooo')
        dispatch(reviewActions.allReviewsbyRestaurant(id))
    }, [dispatch])

    console.log(reviews)

    return (
        <div id='restaurant-details'>
            <img id='restaurant-banner' src='https://d1ralsognjng37.cloudfront.net/8ea36bfe-f70b-4d70-bc1b-a5123a39771b.jpeg'/>
            <div>
                <p>{restaurant && restaurant.name}</p>
                <p>Ratings - See all reviews</p>
            </div>
        </div>
    )
}
