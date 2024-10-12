import "../assets/css/CartTable.css"
import {BookItem} from "../types";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {CartStore} from "../contexts/CartContext";
import {useContext} from "react";
import React from "react";
import {CartTypes} from "../reducers/CartReducer";


const getBookImageUrl = function (book: BookItem): string {
    let filename = book.title.toLowerCase();
    filename = filename.replace(/ /g, "-");
    filename = filename.replace(/'/g, "");
    filename = filename + ".jpg";
    try {
        return require('../assets/images/books/' + filename);
    } catch (_) {
        return require('../assets/images/books/the-iliad.gif');
    }
};

function CartTable() {
    const {cart, dispatch} = useContext(CartStore);
    const addBookToCart = (props: BookItem) => {
        dispatch({ type: CartTypes.ADD, book:props, id: props.bookId });
    };

    const deleteBookFromCart = (props: BookItem) => {
        dispatch({ type: CartTypes.REMOVE, book:props, id: props.bookId });
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.book.price, 0) / 100;
    return (
        // <>
        <div className="cart-table">
            <ul className="cart2">
                {/* TODO : You need to iterate through the cart and display book image, */}
                {/*        Book Title, unit price/quantity and total price for each item in the cart*/}
                {/*        Note that the following simply display hardcoded data*/}
                {cart.map((book) => (

                    <React.Fragment key={book.id}>

                        <li>

                            <div className="cart-book-image">
                                <img className="cart2" src={getBookImageUrl(book.book)} alt="Dune"/>
                            </div>

                            <div className="cart-book-title"> {book.book.title}</div>
                            <div className="cart-book-price">${book.book.price / 100}</div>


                            <div className="cart-book-quantity">
                                <button
                                    className="icon-button dec-button"
                                    onClick={() => deleteBookFromCart(book.book)}
                                >
                                    <i className="fas fa-minus-circle"> <FontAwesomeIcon icon={faMinusCircle}/></i>
                                </button>

                                <span className="quantity">&nbsp;&nbsp;{book.quantity}&nbsp;&nbsp;</span>

                                <button
                                    className="icon-button inc-button"
                                    onClick={() => addBookToCart(book.book)}
                                >

                                    <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle}/></i>
                                </button>
                            </div>

                            <div
                                className="cart-book-subtotal"> ${(book.book.price / 100 * book.quantity).toFixed(2)}</div>


                        </li>
                        <div className="line-sep"></div>
                    </React.Fragment>

                ))}

                <div className="total-amount">Subtotal: ${totalPrice.toFixed(2)}</div>
            </ul>
        </div>

    )
}


export default CartTable;

