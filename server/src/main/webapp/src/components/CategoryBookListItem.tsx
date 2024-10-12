import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import readNowIcon from '../assets/images/site/read-now.svg';
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";
import {useContext} from "react";

const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

function CategoryBookListItem(props: BookItem) {
    const  {cart, dispatch} = useContext(CartStore);
    const addBookToCart = () => {

        dispatch({ type: CartTypes.ADD, book:props, id: props.bookId });
    };
    return (

        <li className="book-box">
            <div className="book-image">
                <img src={require('../assets/images/books/' + bookImageFileName(props))}
                     alt="book.title"
                />
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-author">{props.author}</div>
            <div className="book-price">${(props.price / 100).toFixed(2)}</div>
            <button className="add-to-cart-button" onClick={addBookToCart}>Add to Cart</button>
            {props.isPublic ? (
                <button className="read-now-button">
                    <img src={readNowIcon} alt="read-now-button"/>
                </button>
            ) : null}
        </li>
    )
}

export default CategoryBookListItem;
