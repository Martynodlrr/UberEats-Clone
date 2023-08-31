const GET_ALL_RESTAURANTS = 'restaurants/all'
const UPDATE_RESTAURANT = 'restaurant/update'
const CREATE_RESTAURANT = 'restaurant/create'
const DELETE_RESTAURANT = 'restaurant/delete'
const GET_ONE_RESTAURANT = 'restaurant/one'

const flatten = (arr) => {
    const obj = {}
    if (arr) {
        if (!arr.length) return {}
        for (let el of arr) {
            obj[el.id] = el
        }
    }
    return obj
}

const setOneRestaurant = (data) => {
    return {
        type: GET_ONE_RESTAURANT,
        payload: data
    }
}

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

export const oneRestaurant = (restaurantId) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${restaurantId}`)

    const data = await res.json()

    if (data && !data.errors) {
        dispatch(setOneRestaurant(data))
    }

    return res

}

export const allRestaurants = () => async (dispatch) => {

    const res = await fetch('/api/restaurants')
    const data = await res.json()

    if (data && !data.errors) dispatch(setAllRestaurants(data))

    return res
}

export const userRestaurants = (userId) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/user/${userId}`)
    const data = await res.json()

    if (data && !data.errors) dispatch(setAllRestaurants(data))

    return res
}

export const createRestaurant = (restaurant) => async (dispatch) => {
    const formData = new FormData();

    formData.append("description", restaurant.description);
    formData.append("category", restaurant.category);
    formData.append("address", restaurant.address);
    formData.append("user_id", restaurant.userId);
    formData.append("name", restaurant.name);
    formData.append('image', restaurant.image)

    const res = await fetch('/api/restaurants/', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    if (data && !data.errors) {
        dispatch(setNewRestaurant(data));
    }

    return res;
}

export const updateRestaurant = (restaurant, restaurantId) => async (dispatch) => {
    const formData = new FormData();

    formData.append("description", restaurant.description);
    formData.append("category", restaurant.category);
    formData.append("address", restaurant.address);
    formData.append("name", restaurant.name);

    if (restaurant.image) {
        formData.append("image", restaurant.image);
    }

    const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        body: formData
    });

    const data = await res.json();

    if (data && !data.errors) {
        dispatch(setUpdateRestaurant(data));
    }

    return res;
}

export const deleteRestaurant = (restaurantId) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(removeRestaurant(restaurantId))

    return res

}

const initialState = { restaurants: {} }

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RESTAURANTS:
            const restaurants = flatten(action.payload.restaurants)
            return { ...state, restaurants: restaurants }

        case CREATE_RESTAURANT:
            const restaurant = action.payload
            const newState = { ...state }
            const allRestaurants = { ...newState.restaurants }
            allRestaurants[restaurant.id] = restaurant
            return { ...newState, restaurants: { ...allRestaurants } }

        case UPDATE_RESTAURANT:
            const updatedRestaurant = action.payload
            const updatedState = { ...state }
            const updatedRestaurants = { ...updatedState.restaurants }
            updatedRestaurants[updatedRestaurant.id] = updatedRestaurant
            return { ...updatedState, restaurants: updatedRestaurants }
        case DELETE_RESTAURANT:
            const restaurantId = action.payload
            const finalState = { ...state }
            const finalRestaurants = { ...finalState.restaurants }
            delete finalRestaurants[restaurantId]
            return { ...finalState, restaurants: finalRestaurants }
        case GET_ONE_RESTAURANT:
            return { ...state, restaurant: { ...action.payload.restaurant[0] } }
        default:
            return state
    }
}
