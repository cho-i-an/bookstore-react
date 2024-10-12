import "../assets/css/Checkout.css"

import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails, years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import axios from "axios";
import {OrderDetailsStore} from "../contexts/OrderDetailContext";
import {OrderDetailsTypes} from "../reducers/OrderDetailsReducer";


function CheckoutPage() {

    const getBookImageUrl = function (book: BookItem): string {
        let filename = book.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "") + ".jpg";
        try {
            const imageUrl = require('../assets/images/books/' + filename);
            return imageUrl;
        } catch (error) {
            return require('../assets/images/books/the-iliad.gif');
        }
    };

    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }
    const { dispatch: orderDetailsDispatch } = useContext(OrderDetailsStore);
    const {cart, dispatch} = useContext(CartStore);
    const navigate = useNavigate();


    const cartTotalPrice = cart.reduce((total, book) => {
        return total + (book.book.price / 100 * book.quantity);
    }, 0);
    const taxRate = 0.10;
    const tax = cartTotalPrice * taxRate;
    const totalAmount = cartTotalPrice + tax;
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const [nameError, setNameError] = useState("");


    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 0,
        ccExpiryYear: 0
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCcNumberError] = useState("");


    function isValidForm() {
        const fieldsFilled = formData.name && formData.address && formData.phone && formData.email && formData.ccNumber;
        const noValidationErrors = !nameError && !addressError && !phoneError && !emailError && !ccNumberError;
        return fieldsFilled && noValidationErrors;
    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        const {name, value} = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!value) {
                    setNameError("Name is required.");
                } else if (value.length < 4 || value.length > 45) {
                    setNameError("Name must be between 4 and 45 characters.");
                } else {
                    setNameError("");
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!value) {
                    setAddressError("Address is required.");
                } else if (value.length < 4 || value.length > 45) {
                    setAddressError("Address must be between 4 and 45 characters.");
                } else {
                    setAddressError("");
                }
                break;

            case 'phone':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!value) {
                    setPhoneError("Phone number is required.");
                } else if (!isMobilePhone(value)) {
                    setPhoneError("Invalid phone number.");
                } else {
                    setPhoneError("");
                }
                break;

            case 'email':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!value) {
                    setEmailError("Email is required.");
                } else if (!isvalidEmail(value)) {
                    setEmailError("Invalid email address.");
                } else {
                    setEmailError("");
                }
                break;

            case 'ccNumber':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!value) {
                    setCcNumberError("Credit card number is required.");
                } else if (!isCreditCard(value)) {
                    setCcNumberError("Invalid credit card number.");
                } else {
                    setCcNumberError("");
                }
                break;
            case 'ccExpiryMonth':
                setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
                break;

            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
                break;

            default:
                break;

        }
    }


    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        // console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = 'orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        console.log("order deatils: ", orderDetails);
        return orderDetails;
    }
    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: yearFrom(formData.ccExpiryYear),

            })
            if(orders) {
                setCheckoutStatus("OK");
                orderDetailsDispatch({
                    type: OrderDetailsTypes.UPDATE,
                    order: orders.order,
                    customer: orders.customer,
                    books: orders.books,
                    lineItems: orders.lineItems
                });
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
            }
        }
    }

    return (
        <div className={"checkout-page"}>
            <section className="checkout-cart-table-view">
                <div className="checkout-page-body">
                    <div className="checkout-left">
                        <div>
                            <form
                                onSubmit ={(event)=>submitOrder(event)}
                                method="post"
                            >
                                <div>
                                    <label htmlFor="fname">Name</label>
                                    <input
                                        type="text"
                                        size={20}
                                        name="name"
                                        id="fname"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <> {nameError && <div className="error"> {nameError}</div>}</>


                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" name="phone" id="phone" value={formData.phone}
                                           onChange={handleInputChange}/>
                                </div>
                                <>{phoneError && <div className="error">{phoneError}</div>}</>

                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input type="text" name="address" id="address" value={formData.address}
                                           onChange={handleInputChange}/>
                                </div>
                                <>{addressError && <div className="error">{addressError}</div>}</>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email}
                                           onChange={handleInputChange}/>
                                </div>
                                <>{emailError && <div className="error">{emailError}</div>}</>

                                <div>
                                    <label htmlFor="ccNumber">Credit Card Number</label>
                                    <input type="text" name="ccNumber" id="ccNumber" value={formData.ccNumber}
                                           onChange={handleInputChange}/>
                                </div>
                                <>{ccNumberError && <div className="error">{ccNumberError}</div>}</>

                                <div>
                                    <label htmlFor="ccExpiryMonth">Exp Date</label>
                                    <select style={{color: 'black'}} name="ccExpiryMonth" value={formData.ccExpiryMonth}
                                            onChange={handleInputChange}>
                                        {months.map((month, i) => (
                                            <option key={i} value={i + 1}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>

                                    <select name="ccExpiryYear" value={formData.ccExpiryYear}
                                            onChange={handleInputChange}>
                                        {years.map(year => (
                                            <option key={year} value={year}>
                                                {yearFrom(year)}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <button type="submit" className={"checkout-btn"}>Complete Purchase</button>
                            </form>
                        </div>


                        <div className="checkout-total">
                            <p>Subtotal: ${cartTotalPrice.toFixed(2)}</p>
                            <p>Tax: ${tax.toFixed(2)}</p>
                            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                            <div>Total Items in Cart: {cartQuantity}</div>
                        </div>
                    </div>

                    <div>
                        {
                            checkoutStatus !== '' ?
                                <>
                                    <section className="checkoutStatusBox">
                                        {(checkoutStatus === 'ERROR') ?
                                            <div>
                                                Error: Please fix the problems above and try again.
                                            </div> : (checkoutStatus === 'PENDING' ?
                                                <div>
                                                    Processing...
                                                </div> : (checkoutStatus === 'OK' ?
                                                    <div>
                                                        Order placed...
                                                    </div> :
                                                    <div>
                                                        An unexpected error occurred, please try again.
                                                    </div>))}
                                    </section>
                                </>
                                : <></>}
                    </div>
                </div>

                <div>
                    <ul className="checkout-cart-info">
                        {
                            cart?.map((item, i) => (
                                <div className="checkout-cart-book-item">
                                    <div className="checkout-cart-book-image" key={i}>
                                        <img src={getBookImageUrl(item.book)} alt="title"
                                             className="checkout-cart-info-img"
                                             width="20%"
                                             height="20%"
                                        />
                                    </div>
                                    <div className="checkout-cart-book-info">
                                        <div className="checkout-cart-book-title">{item.book.title}</div>

                                        <div className="checkout-cart-book-subtotal">
                                            {/*TO DO the total cost of this specific book displayed here*/}
                                            ${((item.book.price / 100) * item.quantity).toFixed(2)}
                                        </div>
                                        <div className="checkout-cart-book-quantity">
                                            <button className="checkout-icon-button inc-button" onClick={() => {
                                                dispatch({type: CartTypes.ADD, book: item.book, id: item.book.bookId});
                                            }}>
                                                <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle}/></i>
                                            </button>
                                            <button className="checkout-num-button">{item.quantity}</button>
                                            <button className="checkout-icon-button dec-button"
                                                    onClick={() => {
                                                        dispatch({
                                                            type: CartTypes.REMOVE,
                                                            book: item.book,
                                                            id: item.book.bookId
                                                        });
                                                    }}
                                            >
                                                <i className="fas fa-minus-circle"><FontAwesomeIcon
                                                    icon={faMinusCircle}/></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default CheckoutPage;