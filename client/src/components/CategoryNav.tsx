import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {CategoryItem, CatProp} from '../types';
import {NavLink} from "react-router-dom";
import {Category} from "../contexts/CategoryContext";
import {useContext} from "react";

function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    const handleCategoryClick = (categoryName: string) => {
        localStorage.setItem('lastCategory', categoryName);
    };

    return (
        <nav className="category-nav">
            <ul className="category-buttons">
                {categories.map((item) => (
                    <NavLink
                        key={item.name}
                        to={`/categories/${item.name}`}
                        className={({isActive}) => isActive ? 'button selected-category-button' : 'button unselected-category-button'}
                        onClick={() => handleCategoryClick(item.name)}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </ul>
        </nav>
    )
}

export default CategoryNav;

