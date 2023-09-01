const GET_MENU_ITEMS = 'menuItems/all'
const UPDATE_MENU_ITEM = 'menuItems/update'
const CREATE_MENU_ITEM = 'menuItems/create'
const DELETE_MENU_ITEM = 'menuItems/delete'

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

    const res = await fetch(`/api/menu-items/restaurants/${restaurantId}`)

    const data = await res.json()

    if (data && !data.errors) dispatch(setMenuItems(flatten(data.menuItems)))

    return res
}

export const createMenuItem = (menuItem, restaurantId) => async (dispatch) => {
    const formData = new FormData();

    formData.append('restaurant_id', menuItem.restaurantId);
    formData.append("calories", menuItem.calories);
    formData.append("price", menuItem.price);
    formData.append('image', menuItem.image)
    formData.append("name", menuItem.name);
    formData.append('restaurant_id', restaurantId);
    const res = await fetch(`/api/menu-items/restaurants/${restaurantId}`, {
        method: 'POST',
        body: formData
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setNewMenuItem(data))

    return res
}

export const updateMenuItem = (menuItem, menuId) => async (dispatch) => {
    const formData = new FormData();

    formData.append('restaurant_id', menuItem.restaurantId);
    formData.append("calories", menuItem.calories);
    formData.append("price", menuItem.price);
    formData.append('image', menuItem.image);
    formData.append("name", menuItem.name);

    const res = await fetch(`/api/menu-items/${menuId}`, {
        method: 'Put',
        body: formData
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setUpdateMenuItem(data))

    return res
}

export const deleteMenuItem = (menuItemId) => async (dispatch) => {

    const res = await fetch(`/api/menu-items/${menuItemId}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(removeMenuItems(menuItemId))

    return res

}

const initialState = { menuItems: {} }

export const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MENU_ITEMS:
            return { ...state, menuItems: action.payload }

        case CREATE_MENU_ITEM:
            const menuItem = action.payload
            const newState = { ...state }
            const allMenuItems = { ...newState.menuItems }
            allMenuItems[menuItem.id] = menuItem
            return { ...newState, menuItems: { ...allMenuItems } }

        case UPDATE_MENU_ITEM:
            const updatedMenuItem = action.payload
            const updatedState = { ...state }
            const updatedMenuItems = { ...updatedState.menuItems }
            updatedMenuItems[updatedMenuItem.id] = updatedMenuItem
            return { ...updatedState, menuItems: updatedMenuItems }
        case DELETE_MENU_ITEM:
            const menuItemId = action.payload
            const finalState = { ...state }
            const finalMenuItems = { ...finalState.menuItems }
            delete finalMenuItems[menuItemId]
            return { ...finalState, menuItems: finalMenuItems }
        default:
            return state
    }
}
