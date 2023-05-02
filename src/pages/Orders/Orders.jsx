import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../StateProvider/StateProvider'
import './Orders.css'
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../../firebase';
import BasketItem from '../../components/BasketItem/BasketItem';
import Order from '../../components/Order/Order';
import './Orders.css'
function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [list, setList] = useState([]);
    useEffect(() => {
        console.log("HELLO >>");
        if (user) {
            const getData = async () => {
                const docSnap = await getDocs(collection(db, "users", user?.uid, "orders"));

                setList(() => {
                    let arr = [];
                    docSnap.forEach((doc) => {
                        arr.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    return arr;
                })
            };
            getData();
        }
    }, [user])
    return (
        <div className='orders'>
            {!user && (
                <h1 className='text-[20px] font-medium'>You don't have an account!! Proceed to make one before continuing</h1>
            )}
            {
                user && (
                    <>
                        <h1 className='font-medium text-[25px]'>Your Orders :</h1>
                        <div className='orders__order'>
                            {list?.map((e) => {
                                return <Order order={e} key={e.id} />
                            })}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Orders