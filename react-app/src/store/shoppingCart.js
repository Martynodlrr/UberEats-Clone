const GET_SHOPPING_CART = 'shoppingCart/all'
// const UPDATE_SHOPPING_CART = 'shoppingCart/update'
const CREATE_SHOPPING_CART = 'shoppingCart/create'
const DELETE_SHOPPING_CART = 'shoppingCart/delete'

const setShoppingCart = (data) => {
    return {
        type: GET_SHOPPING_CART,
        payload: data
    }
}

// const setUpdateShoppingCart= (data) => {
//     return {
//         type: UPDATE_SHOPPING_CART,
//         payload: data
//     }
// }

const setNewShoppingCart = (data) => {
    return {
        type: CREATE_SHOPPING_CART,
        payload: data
    }
}

const removeShoppingCartItems = (shopping_cart_id) => {
    return {
        type: DELETE_SHOPPING_CART,
        payload: shopping_cart_id
    }
}

export const shoppingCart = (userId) => async (dispatch) => {

    const res = await fetch(`/api/shopping-carts/${userId}`)

    const data = await res.json()

    if (data && !data.errors) dispatch(setShoppingCart(data))

    return res
}

export const createShoppingCart = (shoppingCart) => async (dispatch) => {

    const res = await fetch(`/api/shopping-carts/${shoppingCart.user_id}`, {
        method: 'POST',
        body: JSON.stringify(shoppingCart)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setNewShoppingCart(data))

    return res

}

// export const updateShoppingCart = (shoppingCart) => async (dispatch) => {

//     const res = await fetch(`/api/shopping-carts/${shoppingCart.user_id}`, {
//         method: 'PUT',
//         body: JSON.stringify(shoppingCart)
//     })

//     const data = await res.json()

//     if (data && !data.errors) dispatch(setUpdateShoppingCart(data))

//     return res
// }

export const emptyShoppingCart = (user_id) => async (dispatch) => {

    const res = await fetch(`/api/shoppingCarts/${user_id}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(removeShoppingCartItems(user_id))

    return res

}

const initialState = {}

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_SHOPPING_CART:
            return {...state, shoppingCart: action.payload}

        case CREATE_SHOPPING_CART:
            return {...state, shoppingCart: action.payload}

        // case UPDATE_SHOPPING_CART:
        //     return {...state, shoppingCart: action.payload}

        case DELETE_SHOPPING_CART:
            const newState = {...state}
            delete newState.shoppingCart
            return {...newState}

        default:
            return state
    }
}
