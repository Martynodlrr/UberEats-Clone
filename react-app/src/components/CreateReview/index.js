import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaStar } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import * as reviewActions from '../../store/review';
import './index.css';

export default function CreateReview({ userId, review, formType, restaurantId, redirect }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [body, setBody] = useState(formType === 'Update Review' ? review.body : '');
    const [rating, setRating] = useState(formType === 'Update Review' ? review.rating : 0);
    const [hover, setHover] = useState(null);
    const history = useHistory()
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};
        if (body.length < 10 || body.length > 255) {
            errors.body = 'Review must be 10-255 characters long.'
        }
        if (rating === 0) {
            errors.rating = 'Please select a star rating.'
        }
        setErrors(errors)
    }, [body, rating]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = {
            user_id: userId,
            restaurant_id: restaurantId,
            body,
            rating
        };

        if (formType === 'Update Review') {
            const returnFromThunk = reviewActions.updateReview(newReview, review.id);
            return dispatch(returnFromThunk).then(() => {
                dispatch(reviewActions.allReviewsbyRestaurant(restaurantId));
                closeModal();
            })
        } else {
            const returnFromThunk = reviewActions.createReview(newReview);
            return dispatch(returnFromThunk).then(() => {
                dispatch(reviewActions.allReviewsbyRestaurant(restaurantId));

                if (redirect) {
                    history.push(`/restaurant/${restaurantId}`)
                }

                closeModal();
            });
        };
    }

    return (
        <>
            <div className='reviewModal'>
                {formType === 'Update Review' ? <h1 id="formTitle">Update your Review</h1> : <h1 id="formTitle">Create a New Review</h1>}
                <form onSubmit={handleSubmit} className="reviewForm">
                    {errors.body && <p className="errors">{errors.body}</p>}
                    <textarea
                        id='reviewTextarea'
                        type='text'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='Leave your review here...' />
                    <div id='stars'>
                        {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                                <label>
                                    <input
                                        className='starsRadio'
                                        type='radio'
                                        value={currentRating}
                                        onClick={(e) => setRating(e.target.value)}
                                    />
                                    <FaStar className="reviewStars"
                                        id='starMenu'
                                        color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            )
                        })} Stars
                    </div>
                    {errors.rating && <p className="errors">{errors.rating}</p>}
                    <button type='submit' className='reviewSubmit' disabled={body.length < 10 || body.length > 255 || rating === 0}>Submit Your Review</button>
                </form>
            </div>
        </>
    )
}
