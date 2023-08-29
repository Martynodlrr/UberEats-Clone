// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_SHOPPING_CART_ITEM = 'shoppingCart/update'
const DELETE_SHOPPING_CART = 'shoppingCart/delete'

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

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	}
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	}
};

const setAddShoppingCartItem = (data) => {
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

const initialState = { user: null };

export const addShoppingCartItem = (item, userId) => async (dispatch) => {

	console.log(item)
	const res = await fetch(`/api/shopping-carts/${userId}`, {
		method: 'PUT',
		body: JSON.stringify(item)
	})
	const data = await res.json()
	console.log('yooooooo',data)

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

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		console.log(data)
		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});


	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:

			const user = action.payload
			const userShoppingCart = user.shopping_cart
			delete user.shopping_cart
			return { ...state, user: user, shoppingCart: flatten(userShoppingCart)};
		case REMOVE_USER:
			return { user: null };
		case ADD_SHOPPING_CART_ITEM:
			return { ...state, shoppingCart: flatten(action.payload['Shopping cart']) }

		case DELETE_SHOPPING_CART:
			const id = action.payload
			const deleteShoppingCartState = { ...state }
			const deleteUserState = {...deleteShoppingCartState.user}
			const newShoppingCart = { ...deleteUserState.shoppingCart }
			delete newShoppingCart[id]
			return { ...deleteShoppingCartState, user: {...deleteUserState, shoppingCart: {...newShoppingCart}} }
		default:
			return state;
	}
}
