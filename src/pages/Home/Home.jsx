import React, { useEffect, useState } from 'react'
import CheckOut from '../../components/CheckOut/CheckOut.jsx'
import Product from '../../components/Product/Product.jsx'
import './Home.css'
import Loader from '../../components/Loader/Loader.jsx';
function Home() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const time = () => {
        console.log("HELLO");
        var arr = document.getElementsByClassName("slides")
        // console.log(arr)
        setTimeout(() => {
            arr[1].style.visibility = "visible";
        }, 5000)
        setTimeout(() => {
            arr[2].style.visibility = "visible";
        }, 10000)
        setTimeout(() => {
            arr[3].style.visibility = "visible";

        }, 15000)
    }
    useEffect(() => {
        time();
        fetch(`https://dummyjson.com/products?limit=36`)
            .then(res => res.json())
            .then(res => {
                setProductList(res.products);
                setLoading(false);
            });
    }, [])
    return (
        <div className='home'>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <div class="image-fader">
                            <img className='slides' src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/MayART23/GW/GW_HERO-PC_PEA_V1_2X._CB590992786_.jpg" />
                            <img className='slides' style={{ visibility: "hidden" }} src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" />
                            <img className='slides' style={{ visibility: "hidden" }} src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/VGSW/2023/Q2/PC_Hero_VG_BAU_Consoles_Apr1st-week_Unrec_2x._CB592233658_.jpg" />
                            <img className='slides' style={{ visibility: "hidden" }} src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/February_2023/BAU_UNREC/Federal/Shoes/Updated/Apay/Apay_3000._CB592918654_.jpg" />
                        </div>
                        <div className="productlist">
                            {
                                productList.map((item) => {
                                    return <Product id={item.id} key={item.id} rating={item.rating} title={item.title} price={item.price} image={item.thumbnail} />
                                })
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Home 