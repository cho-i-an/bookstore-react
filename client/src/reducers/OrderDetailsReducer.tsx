import {BookItem, Customer, LineItem, Order, OrderDetails} from "../types";
import {initialCartState} from "./CartReducer";


export const OrderDetailsTypes = {
    CLEAR: 'CLEAR',
    UPDATE: 'UPDATE',

};


export const initialOrderDetailsState: OrderDetails = {
    order: {
        orderId: 0,
        amount: 0,
        dateCreated: 0,
        confirmationNumber: 0,
        customerId: 0,
    },
    customer: {
        customerName: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: '',
        ccExpDate: 0,
    },
    books: [],
    lineItems: [],
};

export const orderDetailsReducer = (state: OrderDetails, action: {
    type: string;
    book?: BookItem;
    lineItem?: LineItem;
    customer?: Customer;
    order?: Order
    books?: BookItem[]; // books
    lineItems?: LineItem[];
}) => {
    console.log('Action received:', action);

    switch (action.type) {
        case OrderDetailsTypes.UPDATE:
            return {
                // order: action.order || state.order,
                // customer: action.customer || state.customer,
                // books: action.book ? [...state.books, action.book] : state.books,
                // lineItems: action.lineItem ? [...state.lineItems, action.lineItem] : state.lineItems
                order: action.order ?? state.order,
                customer: action.customer ?? state.customer,
                books: action.books ?? state.books,
                lineItems: action.lineItems ?? state.lineItems,
            };

        case OrderDetailsTypes.CLEAR:
            return initialOrderDetailsState;

        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};