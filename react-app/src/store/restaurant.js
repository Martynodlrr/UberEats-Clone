const GET_ALL_RESTAURANTS = 'restaurants/all'
const UPDATE_RESTAURANT = 'restaurant/update'
const CREATE_RESTAURANT = 'restaurant/create'
const DELETE_RESTAURANT = 'restaurant/delete'

const setAllRestaurants = (data) => {
    return {
        type: GET_ALL_RESTAURANTS,
        payload: data
    }
}

const setUpdateRestaurant = (data) => {
    return {
        type: UPDATE_RESTAURANT,
        payload: data
    }
}

const setNewRestaurant = (data) => {
    return {
        type: CREATE_RESTAURANT,
        payload: data
    }
}

const removeRestaurant = (data) => {
    return {
        type: DELETE_RESTAURANT,
        payload: data
    }
}

export const allRestaurants = () => async (dispatch) => {

    const res = await fetch('/api/restaurants')

    const data = await res.json()

    if (data && !data.errors) dispatch(setAllRestaurants(data))

    return res
}

export const createRestaurant = (restaurant) => async (dispatch) => {

    const res = awaitfetch('/api/restaurants', {
        method: 'POST',
        body: JSON.stringify(restaurant)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setNewRestaurant(data))

    return res

}

export const updateRestaurant = (restaurant) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${restaurant.id}`, {
        method: 'PUT',
        body: JSON.stringify(restaurant)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setUpdateRestaurant(data))

    return res
}

export const deleteRestaurant = (restaurantId) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(removeRestaurant(restaurantId))

    return res

}

const initialState = {}

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RESTAURANTS:
            return {...state, allRestaurants: action.payload}

        case CREATE_RESTAURANT:
            const restaurant = action.payload
            const newState = {...state}
            const allRestaurants = {...newState.allRestaurants}
            allRestaurants[restaurant.id] = restaurant
            return {...newState, allRestaurants: {...allRestaurants}}

        case UPDATE_RESTAURANT:
            const updatedRestaurant = action.payload
            const updatedState = {...state}
            const updatedRestaurants = {...updatedState.allRestaurants}
            updatedRestaurants[updatedRestaurant.id] = updatedRestaurant
            return {...oldState, allRestaurants: updatedRestaurants}
        case DELETE_RESTAURANT:
            const restaurantId = action.payload
            const finalState = {...state}
            const finalRestaurants = {...finalState.allRestaurants}
            delete finalRestaurants[restaurantId]
            return {...finalState, allRestaurants: finalRestaurants}
        default:
            return state
    }
}
