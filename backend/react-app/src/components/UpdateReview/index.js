import { useSelector } from 'react-redux';
import CreateReview from '../CreateReview';

export default function UpdateReview() {
    const review = useSelector((state) => state.review);

    return (
        <CreateReview review={review} formType='Update Review' />
    )
}
