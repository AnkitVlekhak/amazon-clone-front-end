import React from 'react'
import './BasketItem.css'
import GradeIcon from '@mui/icons-material/Grade';
import { useStateValue } from '../../StateProvider/StateProvider';
function BasketItem({ id, title, image, price, rating, hideButton, count }) {
    const [state, dispatch] = useStateValue();
    const removeItem = () => {
        dispatch({
            type: "REMOVE_ITEM",
            item: {
                id: id,
                time: 1
            }
        })
    }
    return (
        <div className='basketitem'>
            <img src={image} className="basketitem_image" alt=" product image" />
            <div className="basketitem_info">
                <p className='basketitem_title'>{title}</p>
                <p className='basketitem_title'>Units : {count} </p>
                <p className="basketitem__price">
                    <small>$</small>
                    <strong> {price}</strong>
                </p>
                <span className="product_rating">
                    {
                        Array(Math.round(rating)).fill().map((e, id) => {
                            return <span key={id}><GradeIcon /></span>
                        })
                    }
                </span>
                {!hideButton && (
                    <button className='btn' onClick={removeItem}> Remove this Product </button>
                )}
            </div>

        </div>
    )
}

export default BasketItem