import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import {CategoryItem, CatProp} from '../types';
import {Link} from 'react-router-dom';
import menuIcon from '../assets/images/site/menu.svg';
// import axios from "axios";
import React, {useContext, useState} from 'react';
import {Category} from "../contexts/CategoryContext";

function HeaderDropdown() {

    const [isOpen, setIsOpen] = useState(false);
    const categories = useContext<CategoryItem[]>(Category)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header-dropdown">
            <button className={`button categories-button ${isOpen ? 'close' : ''}`} onClick={toggleMenu}>
                <img src={menuIcon} alt="Menu"/>
            </button>

            <ul className={`${isOpen ? 'open' : ''}`}>
                {categories.map((item) => (
                    <Link to={`/categories/${item.name}`} onClick={() => setIsOpen(false)} key={item.name}>
                        <li>
                            {item.name}
                        </li>
                    </Link>
                ))}
            </ul>

        </div>
    )
}

export default HeaderDropdown;

