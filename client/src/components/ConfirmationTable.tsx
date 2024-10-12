import '../assets/css/ConfirmationTable.css'

import {asDollarsAndCents} from "../utils";

import {BookItem, OrderDetails} from '../types'

import {OrderDetailsStore} from "../contexts/OrderDetailContext";
import {useContext} from "react";

function ConfirmationTable() {
    const {orderDetails} = useContext(OrderDetailsStore);

// A helper function - optional to use
    const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
        return orderDetails.books[index];
    };
    return (

        <table className="confirmation_table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {
                orderDetails.books?.map((book, i) => (
                    <tr className="confirmation_tr" key={i}>
                        <td className="confirmation_td">
                            {book.title}
                        </td>
                        <td className="confirmation_td">{asDollarsAndCents((book.price))}</td>
                        <td className="confirmation_td">
                            {orderDetails.lineItems?.[i]?.quantity || 0}
                        </td>
                    </tr>
                ))}

            <tr>
                <td><b>Total :</b></td>
                <td>{asDollarsAndCents(orderDetails.order.amount)}</td>
                <td></td>
            </tr>
            </tbody>
        </table>
    )
}

export default ConfirmationTable;