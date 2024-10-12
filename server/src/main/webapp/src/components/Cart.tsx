import {Link} from "react-router-dom";
import CartTable from "./CartTable";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import '../assets/css/Cart.css'

function Cart() {

    const {cart, dispatch} = useContext(CartStore);
    // Sum up the quantity of all cart items
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const clearCart = () => {

        dispatch({type: CartTypes.CLEAR});

    };


    // Determine the correct string based on the number of items
    const bookString = totalQuantity === 1 ? 'book' : 'books';
    if (totalQuantity === 0) {
        return (
            <div className="cart-page">
                <center><h1>Empty cart</h1></center>
                <Link to={"/categories/Adventure"} className="continue-btn-empty-page">
                    Continue Shopping
                </Link>
            </div>
        )
    } else {
        return (
            <div className="cart-page">
                <center>
                    <div>
                        <h1>Shopping Cart</h1>
                        <h3> You have {totalQuantity} {bookString} in your cart
                        </h3>
                    </div>
                </center>

                <div>
                    <CartTable></CartTable>
                    <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                </div>

                <div className="cart-action-btns">
                    <Link to={"/categories/Adventure"} className="continue-btn">
                        Continue Shopping
                    </Link>
                    <Link to={"/checkout"} className="checkout-btn">
                        Proceed to Checkout
                    </Link>
                </div>

            </div>

        )
    }
}

export default Cart;