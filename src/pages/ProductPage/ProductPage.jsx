import React, { useEffect, useState } from 'react'
import Product from '../../components/Product/Product';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductPage.css'
import { useStateValue } from '../../StateProvider/StateProvider';
import Loader from '../../components/Loader/Loader';
const ProductPage = () => {
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [loading, setLoading] = useState(true);
    const [currImg, setCurrImg] = useState(null);
    const [{ basket, user }, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: item?.id,
                title: item?.title,
                rating: item?.rating,
                price: item?.price,
                image: item?.thumbnail,
            }
        })
    };
    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=1&skip=${itemId - 1}`)
            .then(res => res.json())
            .then(res => {
                setProductList(res.products);
                setLoading(false);
            });
    }, []);
    const item = productList[0];
    const handleClick = (e) => {
        setCurrImg(e.target.src);
    }
    const discount = Math.round(item?.discountPercentage);
    const originalPrice = Math.round(item?.price + ((item?.price) * (discount) / 100));
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className='product2'>
                        <div className="product_display2">
                            <div className="other_img">
                                {
                                    item.images.map((it, ind) => {
                                        return <img key={ind} className='other_images' src={it} onMouseOver={handleClick} alt="" srcset="" />
                                    })
                                }
                            </div>
                            <div className="curr_img ">
                                <img className='object-contain self-center' src={currImg || item.thumbnail} alt="" srcset="" />
                                <div className="buttons justify-center flex flex-col sm:flex-row mt-[10px] gap-[5px] ">
                                    <button onClick={addToBasket} className='addBTN'>ADD TO CART</button>
                                    <button onClick={() => {
                                        if (!user) {
                                            alert("You don't have an account!! Proceed to make one before continuing");
                                            return;
                                        }
                                        addToBasket(); navigate('/payment')
                                    }}
                                        style={{ backgroundColor: "#fb641b" }} className='addBTN'>BUY NOW</button>
                                </div>
                            </div>

                        </div>
                        <div className="product_info2 ">
                            <h1 className='text-[30px] font-semibold'>{item?.title}</h1>
                            <span className='flex text-white justify-center rounded-[10px] w-[50px] items-center py-[2px] bg-blue-600'>{item?.rating}<GradeIcon style={{ fontSize: "medium" }} className='text-white' /> </span>
                            <span className='text-rose-700 mr-[20px] text-[30px] font-light'>-{discount}%</span>
                            <span className='text-[40px] '>${item?.price}</span>
                            <br />
                            <span className='text-slate-500'>M.R.P : <span className='line-through'>${originalPrice}</span> </span>
                            <br />
                            <span>Inclusive of all taxes</span>
                            <br />
                            <h3 className='text-[20px] font-medium'>Description</h3>
                            <span className='text-[17px]'>{item.description}</span>
                            <br />
                            <span className='text-[20px] font-medium'>Brand : <span className='text-[18px] font-normal'>{item.brand}</span> </span>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProductPage