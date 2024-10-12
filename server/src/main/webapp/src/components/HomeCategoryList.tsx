import '../assets/css/HomeCategoryList.css';
import {categoryImages, CategoryItem, CatProp} from '../types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Category} from "../contexts/CategoryContext";


function HomeCategoryList() {
    const categories = useContext<CategoryItem[]>(Category);

    return (

        <ul className="home-list">
            {categories.map((category) => (
                <li key={category.name} className="home-list-item">
                    <Link to={`/categories/${category.name}`}>
                        <img src={categoryImages[category.name.toLowerCase()]} alt={category.name}/>
                        <div className="home-list-caption">{category.name}</div>
                    </Link>
                </li>
            ))}
        </ul>

    )
}

export default HomeCategoryList;
