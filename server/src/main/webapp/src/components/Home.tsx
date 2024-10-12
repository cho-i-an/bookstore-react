import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css'
import headerImage from '../assets/images/site/header-image.png';
import React from 'react';
import {Link} from 'react-router-dom';
import {CatProp} from "../types";


function Home() {
    return (
        <div className="home-page">
            <section className="welcome-text flow-content container">
                <img src={headerImage} alt="header"/>
            </section>
            <div className="category-images container">
                <HomeCategoryList />
            </div>
            <Link to="/categories/Adventure" className="cta-btn">Discover More</Link>
        </div>
    )
}

export default Home;
