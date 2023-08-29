import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/review';
import './DeleteReview.css';

export default function DeleteReview({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const reviewId = props.props;

    const reviewDelete = (e, reviewId) => {
        e.preventDefault();
        dispatch(reviewActions.deleteReview(reviewId));
        closeModal();
    };
    return (
        <>
            <div className='deleteReview'>
                <h1 id='deleteReviewHead'>Confirm Delete</h1>
                <h2 id='deleteReviewBlurb'>Are you sure you want to delete this review?</h2>
                <button onClick={(e) => reviewDelete(e, reviewId)} id='deleteButton'>Yes (Delete Review)</button>
                <button onClick={closeModal} id='dontDeleteButton'>No (Keep Review)</button>
            </div>
        </>
    )
};
