import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { FaStar } from 'react-icons/fa'
import * as reviewActions from '../../store/review';
import './index.css';

export default function CreateReview({ currentReview, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState(formType === 'Update Review' ? currentReview.review : '');
    const [stars, setStars] = useState(formType === 'Update Review' ? currentReview.stars : null);
    const [hover, setHover] = useState(null);
    const [errors, setErrors] = useState({});
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = {
            review,
            stars
        };

        if (formType === 'Update Review') {
            const returnFromThunk = reviewActions.updateReview(newReview);
            const dbReview = await dispatch(returnFromThunk).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
            if (dbReview) {
                history.push(`/reviews/${dbReview.id}`);
            };
        } else {
            const returnFromThunk = reviewActions.createReview(newReview);
            return dispatch(returnFromThunk).then(() => {
                // dispatch(reviewActions.allReviewsbyRestaurant(restaurantId));
                closeModal();
            });
        };
    }

    return (
        <>
            <div className='reviewModal'>
                {formType === 'Update Review' ? <h1>Update your Review</h1> : <h1>Create a New Review</h1>}
                <form onSubmit={handleSubmit}>
                    {errors.message && <p>{errors.message}</p>}
                    <textarea
                        id='reviewTextarea'
                        type='text'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
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
                                        onClick={(e) => setStars(e.target.value)}
                                    />
                                    <FaStar className="reviewStars"
                                        id='starMenu'
                                        color={currentRating <= (hover || stars) ? '#ffc107' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            )
                        })} Stars
                    </div>
                    <button type='submit' className='signupSubmit' disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
                </form>
            </div>
        </>
    )
}
