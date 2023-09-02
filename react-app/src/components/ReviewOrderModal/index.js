import { useState } from "react"
import { useHistory } from "react-router-dom"
import CreateReview from "../CreateReview"
import './index.css'

export default function ReviewOrderModal({restaurantId, userId, closeModal}) {
    const history = useHistory()
    const [review, setReview] = useState(false)

    return (
        <div>

            {!review && <div id='order-review-modal'>
                <h2>
                    Would you like to leave a review?
                </h2>
                <button onClick={() => setReview(true)} className="order-review-buttons" id='leave-review-order'>Leave a review</button>
                <button onClick={() => {
                    history.push('/')
                    closeModal()
                    }} className="order-review-buttons">No, thank you</button>
            </div>}
            {
                review && <CreateReview userId={userId} restaurantId={restaurantId} redirect={true}/>
            }
        </div>
    )
}
