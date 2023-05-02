import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider/StateProvider';
import BasketItem from '../BasketItem/BasketItem'
import SubTotal from '../SubTotal/SubTotal'
import './CheckOut.css'
function CheckOut() {
    const [{ basket, itemCount }, dispatch] = useStateValue();
    return (
        <div className='checkout'>
            <div className="checkout_left">
                <h2 className='checkout_title'>Your shopping Basket</h2>
                {basket.map((e, index) => {
                    return <BasketItem image={e.image} title={e.title} count={itemCount[e.id]} price={e.price} rating={e.rating} key={index} id={e.id} />
                })}
            </div>

            <div className="checkout_right">
                <SubTotal />
            </div>
        </div>
    )
}

export default CheckOut