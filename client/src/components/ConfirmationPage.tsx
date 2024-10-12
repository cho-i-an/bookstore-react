

import '../assets/css/ConfirmationPage.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
import {OrderDetailsStore} from "../contexts/OrderDetailContext";


function ConfirmationPage()
{
    const { orderDetails} = useContext(OrderDetailsStore);

    const orderDate =  () => {
        let date = new Date(orderDetails.order.dateCreated);
        return ( date.toLocaleString());
    };
    const ccExpDate =  (): Date =>{
        return new Date(orderDetails.customer.ccExpDate);
    };

    const formatCreditCardNumber = (ccNumber: string) => {
        return ccNumber.slice(-4);
    };


    return(
        <div className="confirmationView">
            <ul>
                <li><h2>Thank you for your purchase!</h2></li>
                <li>Confirmation #: {orderDetails?.order.confirmationNumber}</li><br/>
                <li>{orderDate()}</li>
            </ul>
            <ConfirmationTable />
            <ul>
                <h2>Order Information</h2>
                <li><b>Name:</b> { orderDetails?.customer?.customerName}</li>
                <li><b>Address:</b> { orderDetails?.customer?.address }</li>
                <li><b>Email:</b> { orderDetails?.customer?.email }</li>
                <li><b>Phone:</b> { orderDetails?.customer?.phone }</li>
                <li><b>Credit Card Number(Last 4 Digits):</b> {formatCreditCardNumber(orderDetails?.customer?.ccNumber)}</li>
                <li><b>Credit Card Expiration Date:</b>{ccExpDate().getFullYear()}/{ccExpDate().getMonth()}</li>
            </ul>
            <div id="customerInfo"></div>
        </div>
    )
}
export default ConfirmationPage;