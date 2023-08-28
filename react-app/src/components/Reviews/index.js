import OpenModalButton from '../OpenModalButton'
import DeleteReview from '../DeleteReview'
import './index.css'

export default function Reviews({reviews, userId}) {
    return (
        <div className='reviews'>

            {
            reviews.map((review) => {
                return <div className='review'>
                    <h4 className="review-username">{review.username}</h4>
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
