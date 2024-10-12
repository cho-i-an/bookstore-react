import {createContext, ReactNode} from "react";
import {CategoryItem} from "../types";
import axios from "axios";
import {useEffect, useState} from "react";


export const Category = createContext<CategoryItem[] | []>([]);
Category.displayName = 'CategoryContext';

interface CategoryContextProps {
    children: ReactNode;
}

function CategoryContext ({ children }:CategoryContextProps)  {
    // axios.defaults.baseURL = 'http://localhost:8080/IAnBookstoreReactTransact/api/';
    axios.defaults.baseURL = 'http://webdev.cs.vt.edu:8080/IAnBookstoreReactTransact/api/';

    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(0);
    useEffect(() => {
        axios.get('categories')
            .then((result) => setCategories(result.data))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;