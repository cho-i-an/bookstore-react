import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import {OrderDetails, ShoppingCartItem} from "../types";
import { orderDetailsReducer, initialOrderDetailsState } from "../reducers/OrderDetailsReducer";

interface OrderDetailsContextType {
    orderDetails: OrderDetails;
    dispatch: Dispatch<any>;
}

export const OrderDetailsStore = createContext<OrderDetailsContextType>({
    orderDetails: initialOrderDetailsState,  // Make sure this is an OrderDetails object
    dispatch: () => null
});

OrderDetailsStore.displayName = 'OrderDetailContext';

interface OrderDetailContextProps {
    children: ReactNode;
}

function OrderDetailsContext ({ children }: OrderDetailContextProps) {
    const storageKey = 'orderDetail';

    const [orderDetails, dispatch] = useReducer(orderDetailsReducer, initialOrderDetailsState, (initialOrderDetailsState) => {
        try {
            const storedOrderDetails = JSON.parse(localStorage.getItem(storageKey) || '{}');
            return storedOrderDetails as OrderDetails || initialOrderDetailsState;
        } catch (error) {
            console.log('Error parsing order detail', error);
            return initialOrderDetailsState;
        }
    });

    return (
        <OrderDetailsStore.Provider value={{ orderDetails, dispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
}

export default OrderDetailsContext;