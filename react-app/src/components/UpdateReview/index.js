import { useSelector } from 'react-redux';
import CreateReview from '../CreateReview';

export default function UpdateReview({ reviewId }) {
    const idOfReview = reviewId
    const review = useSelector((state) => state.reviews.reviews[idOfReview]);

    return (
        <CreateReview review={review} formType='Update Review' />
    )
}
