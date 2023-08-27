import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/review';
import './CreateReview.css';

export default function CreateReview({ review, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState(formType === 'Update Review' ? review.review : '');
    const [stars, setStars] = useState(formType === 'Update Review' ? review.stars : 0);
    const [hover, setHover] = useState(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = {
            review,
            stars
        };

        if (formType === 'Update Review') {
            const returnFromThunk = reviewActions.updateReview(review, newReview);
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
            const returnFromThunk = reviewActions.createReview(newReview, spotId);
            return dispatch(returnFromThunk).then(() => {
                dispatch(reviewActions.allReviews(spotId));
                closeModal();
            }).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            });
        };
    }

    return (
        <>
            <div className='reviewModal'>
                {formType === 'Update Spot' ? <h1>Update your Review</h1> : <h1>Create a New Review</h1>}
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
                                    <i class="fa-solid fa-star"
                                        id='starMenu'
                                        color={currentRating <= (hover || stars) ? '#fefe33' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}></i>
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
