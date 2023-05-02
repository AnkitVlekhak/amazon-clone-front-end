import React from 'react'
import './SubTotal.css'
import currency from 'currency.js';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider/StateProvider';
// import CurrencyFormat from 'react-currency-format';
function SubTotal() {
    const navigate = useNavigate();
    const [{ basket, itemCount, user }, dispatch] = useStateValue();
    let len = 0;
    basket.map((e) => {
        len = len + itemCount[e.id];
    })
    const getBasketValue = (basket, itemCount) => {
        return basket?.reduce((amount, item) => (itemCount[item.id] * item.price) + amount, 0);
    }
    let ini_value = getBasketValue(basket, itemCount);
    let value = currency(ini_value).format();

    const handlePayment = (e) => {
        if (!user) {
            alert("You don't have an account!! Proceed to make one before continuing");
            return;
        }
        if (ini_value === 0) {
            alert("Your Cart is empty!! Please select item of your liking before continuing")
            return;
        }
        navigate('/payment')
    }

    return (
        <div className='subtotal'>
            <p>
                SubTotal ({len} items) : <strong>{value}</strong>
            </p>
            <small className='subtotal_gift'>
                <input type="checkbox" name="" id="" />This Order is a Gift
            </small>

            <button onClick={handlePayment} className='btn'>Proceed to Checkouts</button>
        </div>
    )
}

export default SubTotal;