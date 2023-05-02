import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useStateValue } from '../../StateProvider/StateProvider';
import { auth } from '../../firebase';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
function Header() {
    const handleSignOut = () => {
        setPhonenav(!phonenav)
        if (user) {
            auth.signOut();
        }
    }
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [phonenav, setPhonenav] = useState(false);
    const [productList, setProductList] = useState([]);
    const [{ basket, user, itemCount }, dispatch] = useStateValue();
    // console.log(user.displayName);
    const handleSearch = () => {

        setPhonenav(!phonenav)
        setData("")
        navigate(`/search?data=${data}`)
    }
    const handleClick = () => {
        setPhonenav(!phonenav)
        console.log(phonenav)
    }
    let len = 0;
    basket.map((e) => {
        len = len + itemCount[e.id];
    })
    return (
        <div className='header'>
            <MenuIcon className='phonecompo text-white cursor-pointer' style={{ fontSize: "40px" }} onClick={handleClick} />
            <Link to='/'>
                <img className='header_logo' src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon_logo" />
            </Link>
            <div className="header_search">
                <input type="text" className='header_searchInput' onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }} onChange={(e) => { setData(e.target.value) }} value={data} />
                <SearchIcon className='header_searchIcon' onClick={handleSearch} />
            </div>
            <div className="header_nav">
                <Link to={!user && '/login'}>
                    <div className="header_options" onClick={handleSignOut}>
                        <span className='header_optionOne'>Hello {user ? `${user?.displayName}` : "Guest"}</span>
                        <span className='header_optionTwo'>{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>
                <Link to='/orders'>
                    <div className="header_options">
                        <span className='header_optionOne'>Returns</span>
                        <span className='header_optionTwo'>& Orders</span>
                    </div>
                </Link>
            </div>
            <Link to={'/checkout'}>
                <div className="header__optionBasket">
                    <ShoppingCartIcon />
                    <span className="header__optionTwo header__basketCount">
                        {len}
                    </span>
                </div>
            </Link>
            {
                <div className={phonenav ? "newnav" : "newnav null"}>
                    <div className={"phoneNav"}>
                        <CloseIcon style={{ color: "white", fontSize: "40px", position: "absolute", right: "20px", cursor: "pointer" }} className='phonecompo' onClick={handleClick} />
                        <Link to={!user && '/login'}>
                            <div className="header_options" onClick={handleSignOut}>
                                <PersonIcon style={{ color: "white", fontSize: "50px", borderRadius: "40px", marginTop: "40px", padding: "10px", background: "gray" }} />
                                <span className='header_optionOne'>Hello {user ? `${user?.displayName}` : "Guest"}</span>
                                <span className='header_optionTwo'>{user ? "Sign Out" : "Sign In"}</span>
                            </div>
                        </Link>
                        <div className="header_search">
                            <input type="text" className='header_searchInput h-[30px]' onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }} onChange={(e) => { setData(e.target.value) }} value={data} />
                            <SearchIcon className='header_searchIcon h-[30px]' onClick={handleSearch} />
                        </div>
                        <Link to='/orders' onClick={() => setPhonenav(!phonenav)}>
                            <div className="header_options">
                                <span className='header_optionTwo'>Returns & Orders</span>
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Header