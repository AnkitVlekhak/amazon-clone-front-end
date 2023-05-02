import React, { useEffect, useState } from 'react'
import './SearchResults.css'
import { Link, useLocation } from 'react-router-dom'
import BasketItem from '../../components/BasketItem/BasketItem';
import Loader from '../../components/Loader/Loader';
const SearchResults = () => {
    const search = useLocation().search;
    const data = new URLSearchParams(search).get('data');
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${data}`)
            .then(res => res.json())
            .then(res => {
                setProductList(res.products);
                setLoading(false);
            });
    }, [data]);
    console.log(productList);
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className='checkout'>
                        <div className="checkout_left">
                            <h2 className='checkout_title font-medium text-[20px]'>Search Results for term "{data}" :</h2>
                            {
                                productList.map((e, index) => {
                                    return <Link key={index} style={{ textDecoration: "none" }} to={`/product/${e.id}`}>
                                        <BasketItem image={e.thumbnail} title={e.title} hideButton={true} price={e.price} rating={e.rating} id={e.id} />
                                    </Link>

                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default SearchResults