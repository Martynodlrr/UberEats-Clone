import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as restaurantActions from '../../store/restaurant'
import './index.css'
import { useEffect } from 'react'

export default function RestaurantDetails() {

    const params = useParams()

    const id = params.restaurantId

    const dispatch = useDispatch()

    const restaurant = useSelector(state => state.restaurants.restaurant)

    const elements = document.getElementsByClassName('bz hl')[0].children[0].children

    const obj = {}
    console.log(elements)

    for (let el of elements) {
        const ul = el.getElementsByTagName('ul')[0]
        console.log(ul.children)


            for (let dat of ul.children) {
                console.log(dat)
                if (dat.children[0].children[0].children[0].children[0].children[0].children[0].children[0]) {
                    if (dat.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0]) {
                        const image = dat.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].srcset
                const name = dat.children[0].children[0].children[0].children[1].children[0].children[0].innerText
                const price = dat.children[0].children[0].children[0].children[1].children[1].innerText

                console.log(price)

                obj[name] = {name, price, image}
                    }

                }


            }



    }

    console.log(obj)

    useEffect(() => {
        dispatch(restaurantActions.oneRestaurant(id))
    }, [dispatch])

    console.log(restaurant)

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
