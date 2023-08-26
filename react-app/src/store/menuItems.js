const GET_MENU_ITEMS = 'menuItems/all'
const UPDATE_MENU_ITEM = 'menuItems/update'
const CREATE_MENU_ITEM = 'menuItems/create'
const DELETE_MENU_ITEM = 'menuItems/delete'

const setMenuItems = (data) => {
    return {
        type: GET_MENU_ITEMS,
        payload: data
    }
}

const setUpdateMenuItem = (data) => {
    return {
        type: UPDATE_MENU_ITEM,
        payload: data
    }
}

const setNewMenuItem = (data) => {
    return {
        type: CREATE_MENU_ITEM,
        payload: data
    }
}

const removeMenuItems = (data) => {
    return {
        type: DELETE_MENU_ITEM,
        payload: data
    }
}

export const allMenuItems = (restaurantId) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${restaurantId}/menu-items`)

    const data = await res.json()

    if (data && !data.errors) dispatch(setMenuItems(data))

    return res
}

export const createMenuItem = (menutItem) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${restaurantId}/menu-items`, {
        method: 'POST',
        body: JSON.stringify(menutItem)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setNewMenuItem(data))

    return res

}

export const updateMenuItem = (menutItem) => async (dispatch) => {

    const res = await fetch(`/api/menuItems/${menutItem.id}`, {
        method: 'PUT',
        body: JSON.stringify(menutItem)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setUpdateMenuItem(data))

    return res
}

export const deleteMenuItem = (menuItem) => async (dispatch) => {

    const res = await fetch(`/api/menuItems/${menuItem.id}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(removeMenuItems(menuItem.id))

    return res

}

const initialState = { menuItems: {}}

export const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MENU_ITEMS:
            return {...state, menuItems: action.payload}

        case CREATE_MENU_ITEM:
            const menuItem = action.payload
            const newState = {...state}
            const allMenuItems = {...newState.menuItems}
            allMenuItems[menuItem.id] = menuItem
            return {...newState, menuItems: {...allMenuItems}}

        case UPDATE_MENU_ITEM:
            const updatedMenuItem = action.payload
            const updatedState = {...state}
            const updatedMenuItems = {...updatedState.menuItems}
            updatedMenuItems[updatedMenuItem.id] = updatedMenuItem
            return {...updatedState, menuItems: updatedMenuItems}
        case DELETE_MENU_ITEM:
            const menuItemId = action.payload
            const finalState = {...state}
            const finalMenuItems = {...finalState.menuItems}
            delete finalMenuItems[menuItemId]
            return {...finalState, menuItems: finalMenuItems}
        default:
            return state
    }
}
