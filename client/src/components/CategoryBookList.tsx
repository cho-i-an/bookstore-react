import '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import "../types";
import {BookItem, CatProp} from "../types";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function CategoryBookList() {
    const {catId} = useParams();
    // axios.defaults.baseURL = "http://localhost:8080/IAnBookstoreReactTransact/api/";
    axios.defaults.baseURL = "http://webdev.cs.vt.edu:8080/IAnBookstoreReactTransact/api/";
    const [books, setBooks] = useState([]);
    useEffect(() => {
            axios.get(`categories/name/${catId}/books`)
                .then((response) => {
                    setBooks(response.data);

                })
        }, [catId]
    );
    return (
        <div className="category-page"><>
            <CategoryNav/>
            <ul className="book-lists">
                {Object.values(books).map((book: BookItem) => (
                    <CategoryBookListItem key={book.bookId} bookId={book.bookId} isPublic={book.isPublic}
                                          price={book.price}
                                          title={book.title} author={book.author} categoryId={book.categoryId}/>))}
            </ul>
        </>
        </div>
    )
}

export default CategoryBookList;
