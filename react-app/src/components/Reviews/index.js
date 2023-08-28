import OpenModalButton from '../OpenModalButton'
import DeleteReview from '../DeleteReview'
import CreateReview from '../CreateReview'
import './index.css'

export default function Reviews({ reviews, userId }) {
    return (
        <div className='reviews'>
            <OpenModalButton
                buttonText="Write a Review"
                className='delete-review'
                modalComponent={<CreateReview userId={userId} />}
            />
            {
                reviews.map((review) => {
                    return <div className='review'>
                        <div className='review-username'>
                            <h4 className="review-username">{review.username}</h4>
                            <div className='review-rating'>
                                <h3>{review.rating}</h3>
                                <img src='/images/star.png' />
                            </div>
                        </div>

                        <p className="review-body">{review.body}</p>
                        {
                            userId === review.user_id && <OpenModalButton
                                buttonText="Delete"
                                className='delete-review'
                                modalComponent={<DeleteReview reviewId={review.id} />}
                            />
                        }
                    </div>
                })
            }
        </div>
    )
}
