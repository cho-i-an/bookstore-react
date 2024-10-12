import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import '../assets/css/HeaderSearchBar.css';
// import '../assets/css/HeaderDropdown.css';
import {Link} from 'react-router-dom';
import searchIcon from '../assets/images/site/search.svg';
import userIcon from '../assets/images/site/user.svg';
import cartIcon from '../assets/images/site/cart.svg';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";

function AppHeader() {
    const {cart} = useContext(CartStore);
    const cartQuantity = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
    }, 0);
    return (

        <header className="container">

            {/* Bookstore Logo and Title */}
            <section className="bookstore-logo-and-title">
                <Link to="/">
                    <img
                        src={require('../assets/images/site/WisdomWings-Logo1.png')}
                        alt="BookstoreLogo" id="logo"
                    />
                </Link>
                <Link to="/">
                    <img src={require('../assets/images/site/WisdomWings-TITLE.png')} alt="BookstoreTITLE" id="title"/>
                </Link>
            </section>

            {/* Search Bar */}
            <section className="search-bar-section">
                <form action="" className="search-box">
                    <input type="text" className="search-bar" placeholder="Search by title, author, or genre"/>
                    <button type="submit" className="search-button">
                        <img src={searchIcon} alt="Search" width="24" height="24"/>
                    </button>
                </form>
            </section>

            {/* Member, Cart and Hamburger */}
            <section className="header-dropdown-and-cart">
                <div className="user-status-text">
                    Welcome Back!<br/>
                    Emily
                </div>
                <button className="button">
                    <img src={userIcon} alt="user-btn" width="35" height="35"/>
                </button>
                <Link to="/cart">
                    <button className="button cart-button">
                        <img src={cartIcon} alt="cart-btn" width="35" height="35"/>
                        <span className="cart-badge">{cartQuantity}</span>
                    </button>
                </Link>
                <HeaderDropdown/>
            </section>

        </header>
    )
}

export default AppHeader;

