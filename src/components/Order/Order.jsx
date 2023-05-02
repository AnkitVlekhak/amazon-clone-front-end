import React from 'react'
import BasketItem from '../BasketItem/BasketItem'
import moment from 'moment';
import './Order.css'
function Order({ order }) {
    return (
        <div className='order'>
            <span className='font-medium text-[17px]'>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</span>
            <p className="order__id text-[15px]">
                <p className='flex font-medium'>Payment ID : {order.id}</p>
            </p>
            {order.data.basket.map((e, ind) => {
                return <BasketItem image={e.image} title={e.title} price={e.price} rating={e.rating} key={ind} id={e.id} hideButton />
            })}
        </div>
    )
}

export default Order