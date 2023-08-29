// const GET_SHOPPING_CART = 'shoppingCart/all'
const ADD_SHOPPING_CART_ITEM = 'shoppingCart/update'
// const CREATE_SHOPPING_CART = 'shoppingCart/create'
const DELETE_SHOPPING_CART = 'shoppingCart/delete'

// const setShoppingCart = (data) => {
//     return {
//         type: GET_SHOPPING_CART,
//         payload: data
//     }
// }

const setAddShoppingCartItem= (data) => {
    return {
        type: ADD_SHOPPING_CART_ITEM,
        payload: data
    }
}

const removeShoppingCartItem = (shoppingCartId) => {
    return {
        type: DELETE_SHOPPING_CART,
        payload: shoppingCartId
    }
}

// export const getShoppingCart = (userId) => async (dispatch) => {

//     const res = await fetch(`/api/shopping-cart-items/${userId}`)

//     const data = await res.json()

//     if (data && !data.errors) dispatch(setShoppingCart(data))

//     return res
// }

// export const createShoppingCart = (shoppingCart) => async (dispatch) => {

//     const res = await fetch(`/api/shopping-carts/${shoppingCart.user_id}`, {
//         method: 'POST',
//         body: JSON.stringify(shoppingCart)
//     })

//     const data = await res.json()

//     if (data && !data.errors) dispatch(setNewShoppingCart(data))

//     return res

// }


//shopping cart item = {userId, itemId}
export const addShoppingCartItem = (shoppingCart) => async (dispatch) => {

    const res = await fetch(`/api/shopping-cart-items`, {
        method: 'POST',
        body: JSON.stringify(shoppingCart)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setAddShoppingCartItem(data))

    return res
}

export const deleteShoppingCartItem = (itemId) => async (dispatch) => {

    const res = await fetch(`/api/shopping-cart-items/${itemId}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(removeShoppingCartItem(itemId))

    return res

}

const initialState = { shoppingCart: {}}

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {

        // case GET_SHOPPING_CART:
        //     return {...state, shoppingCart: action.payload}

        // case CREATE_SHOPPING_CART:
        //     return {...state, shoppingCart: action.payload}

        case ADD_SHOPPING_CART_ITEM:
            const item = action.payload
            const addShoppingCartState = {...state}
            const shoppingCart = {...addShoppingCartState.shoppingCart}
            shoppingCart[item.id] = item
            return {...addShoppingCartState, shoppingCart: action.payload}

        case DELETE_SHOPPING_CART:
            const newState = {...state}
            delete newState.shoppingCart
            return {...newState}

        default:
            return state
    }
}
