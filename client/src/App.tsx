import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import Cart from './components/Cart';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import axios from "axios";
import React, {useEffect, useState} from 'react';
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage";


function App() {

    axios.defaults.baseURL = "http://webdev.cs.vt.edu:8080/IAnBookstoreReactTransact/api/";
    // axios.defaults.baseURL = "http://localhost:8080/IAnBookstoreReactTransact/api/";
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(0);
    useEffect(() => {
        axios.get('categories')
            .then((result) => setCategories(result.data))
            .catch(console.error);
    }, []);

    return (
        <Router basename={"IAnBookstoreReactTransact"}>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/categories" element={<CategoryBookList/>}>
                    <Route path=":catId" element={<CategoryBookList/>}/>
                </Route>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/confirmation" element={<ConfirmationPage/>}/>
                <Route path="*" element={<div>Page Not Found</div>}/>
            </Routes>
            <AppFooter/>
        </Router>
    );
}

export default App;

