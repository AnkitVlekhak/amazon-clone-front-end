import React from 'react'
import './Product.css'
import GradeIcon from '@mui/icons-material/Grade';
import { useStateValue } from '../../StateProvider/StateProvider';
import { Link } from 'react-router-dom';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
function Product({ id, title, image, rating, price }) {
    const [{ basket }, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                rating: rating,
                price: price,
                image: image,
            }
        })
    };
    let rStar = 5 - Math.floor(rating);
    let rStar0 = (Math.ceil((rating % 1) * 2) / 2);
    if (rStar0 === .5) {
        rStar--;
    }
    return (
        <div className="product">
            <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
                <img src={image} alt="product photo " className="product_image" />
            </Link>
            <div className="product__info">
                <span className="product_title">{title}</span>
                <span className="product_rating">
                    {
                        Array(Math.floor(rating)).fill().map((e, id) => {
                            return <span key={id}><GradeIcon /></span>
                        })
                    }
                    {rStar0 === 0.5 ? <span> <StarHalfIcon /> </span> : ""}
                    {
                        Array(Math.floor(rStar)).fill().map((e, id) => {
                            return <span key={id}><StarOutlineIcon /></span>
                        })
                    }
                    <span className='text-black'>({rating})</span>
                </span>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>

            {/* <button onClick={addToBasket}>Add to Cart</button> */}
        </div>
    )
}

export default Product
// rStar0 === 1 ? <GradeIcon /> : "";
// 