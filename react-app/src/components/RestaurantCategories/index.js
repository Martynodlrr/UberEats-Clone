import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as restaurantActions from '../../store/restaurant'
import './index.css'

export default function RestaurantCategories() {

    const history = useHistory()

    const dispatch = useDispatch()

    const restaurants = useSelector(state => state.restaurants.restaurants)



    useEffect(() => {
        dispatch(restaurantActions.allRestaurants())
    }, [dispatch])

    const categories = {}

    for (let rest of Object.values(restaurants)) {
        if (!categories[rest.category]) {
            categories[rest.category] = {}
            categories[rest.category][rest.id] = rest
        }
        else {
            categories[rest.category][rest.id] = rest
        }

    }

    return (
        <div id='restaurant-categories'>
            {
                Object.keys(categories).map((category) => {
                    const originalCat = category
                    if (category == 'fastFood') category = "Fast Food"
                    if (category == 'petSupplies') category = "Pet Supplies"
                    if (category == 'specialtyFoods') category = "Specialty Foods"
                    else {
                        category = category.split('')
                        category[0] = category[0].toUpperCase()
                        category = category.join('')
                    }
                    return <div className="restaurant-category">
                        <h1 className='category-name'>{category}</h1>
                        <div className='restaurant-category-list'>
                            {Object.values(categories[originalCat]).map((restaurant) => {
                                return <div className='category-restaurant category-restaurant-margin' onClick={() => history.push(`/restaurant/${restaurant.id}`)}>
                                    <img className='restaurant-category-image' src={restaurant.image} />
                                    <p className='category-restaurant-name'>{restaurant.name}</p>
                                    <p>$100 Delivery Fee</p>
                                </div>
                            })}
                        </div>

                    </div>
                })
            }
        </div>
    )
}
