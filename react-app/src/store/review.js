const GET_RESTAURANT_REVIEWS = 'reviews/all'
const UPDATE_REVIEW = 'reviews/update'
const CREATE_REVIEW = 'reviews/create'
const DELETE_REVIEW = 'reviews/delete'

const setAllReviews = (data) => {
    return {
        type: GET_RESTAURANT_REVIEWS,
        payload: data
    }
}

const setUpdateReview= (data) => {
    return {
        type: UPDATE_REVIEW,
        payload: data
    }
}

const setNewReview = (data) => {
    return {
        type: CREATE_REVIEW,
        payload: data
    }
}

const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
}

export const allReviews = () => async (dispatch) => {

    const res = await fetch('/api/reviews')

    const data = await res.json()

    if (data && !data.errors) dispatch(setAllReviews(data))

    return res
}

export const createReview = (review) => async (dispatch) => {

    const res = await fetch(`/api/restaurants/${review.restaurant_id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setNewReview(data))

    return res

}

export const updateReview = (review) => async (dispatch) => {

    const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(setUpdateReview(data))

    return res
}

export const deleteReview = (reviewId) => async (dispatch) => {

    const res = await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if (data && !data.errors) dispatch(removeReview(reviewId))

    return res

}

const initialState = {}

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_RESTAURANT_REVIEWS:
            return {...state, allReviews: action.payload}

        case CREATE_REVIEW:
            const review = action.payload
            const newState = {...state}
            const allReviews = {...newState.allReviews}
            allReviews[review.id] = review
            return {...newState, allReviews: {...allReviews}}

        case UPDATE_REVIEW:
            const updatedReview = action.payload
            const updatedState = {...state}
            const updatedReviews = {...updatedState.allReviews}
            updatedReviews[updatedReview.id] = updatedReview
            return {...updatedState, allReviews: updatedReviews}
        case DELETE_REVIEW:
            const reviewId = action.payload
            const finalState = {...state}
            const finalReviews = {...finalState.finalReviews}
            delete finalReviews[reviewId]
            return {...finalState, allReviews: finalReviews}
        default:
            return state
    }
}
