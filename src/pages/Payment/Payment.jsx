import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BasketItem from '../../components/BasketItem/BasketItem';
import { useStateValue } from '../../StateProvider/StateProvider'
import './Payment.css'
import currency from 'currency.js';
import { paymentStripe } from '../../axios';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

function Payment() {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisable] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const [{ basket, user, itemCount }, dispatch] = useStateValue();
    let len = 0;
    basket.map((e) => {
        len = len + itemCount[e.id];
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
            .then(({ paymentIntent, error }) => {
                const addToFire = async () => {
                    await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created,
                    })
                }
                if (error) { setError(true) }
                else {
                    addToFire()
                    setSucceeded(true);
                    setError(null)
                    setProcessing(false)
                    dispatch({
                        type: "EMPTY_BASKET",
                    })
                    navigate('/orders')
                }

            }).catch((err) => {
                console.log(err);
            })
    }
    const handleChange = (e) => {
        setDisable(false);
        setError(e.error ? e.error.message : "");
    }
    const getBasketValue = (basket, itemCount) => {
        return basket?.reduce((amount, item) => (itemCount[item.id] * item.price) + amount, 0);
    }
    let value = currency(getBasketValue(basket, itemCount), { precision: 2 }).format();

    useEffect(() => {
        const getClientSecret = async () => {
            const pr = getBasketValue(basket, itemCount) * 100;
            if (pr == 0) return;
            const response = await paymentStripe(pr);
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    return (
        <div className='payment'>
            <div className="payment_container">
                <h1>
                    Checkout(<Link to={'/checkout'}>{len}</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 React Line</p>
                        <p>Los Angeles,CA</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map((e, index) => {
                            return <BasketItem image={e.image} hideButton={true} count={itemCount[e.id]} title={e.title} price={e.price} rating={e.rating} key={index} id={e.id} />
                        })}
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Methods</h3>
                    </div>
                    <div className="payment_details">
                        <form action="" onClick={handleSubmit}>
                            <div className="payment_priceContainer">
                                <CardElement onChange={handleChange} />
                                <p>
                                    Order Total ({len} items) : <strong>{value}</strong>
                                </p>
                                <button className='btn cursor-pointer' disabled={disabled || processing || succeeded}>
                                    <span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            <div>
                                {error && <div>{error}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment