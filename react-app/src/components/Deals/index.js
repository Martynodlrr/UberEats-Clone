import { useSelector } from 'react-redux'
import './index.css'

export default function Deals() {
    const user = useSelector(state => state.session.user)

    return (
        <div id='deals'>
            <div className="deal-card">
                <div className="deal-info" id='deal-inner-card-1'>
                    <p>BOGO-litious deals on your favorite meals</p>
                    <button>Order now!</button>
                </div>
                <img className='deal-image' src='/images/deals/deal-1.png' />
            </div>
            <div className="deal-card" id='deal-inner-card-2'>
                <div className="deal-info">
                    <p>Back to school shopping is back and easier than ever</p>
                    <button>Order now!</button>
                </div>
                <img className='deal-image' src='/images/deals/deal-2.png' />
            </div>
            <div className="deal-card" id='deal-inner-card-3'>
                <div className="deal-info">
                    <p>Got a friend who has never ordered on Hello Eats? Spread the word!</p>
                    <button ID='promo-code'>Use code: YOUTHOUGHT69</button>
                </div>
                <img className='deal-image' src='/images/deals/deal-3.jpg' />
            </div>
        </div>
    )
}
