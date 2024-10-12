import React, {createContext, Dispatch, ReactNode, Reducer, useEffect, useReducer, useState} from "react";
import {cartReducer} from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";


const initialCartState:ShoppingCartItem[] =  []
// const initialCartState:ShoppingCartItem[] =  []
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';
interface CartContextProps {
    children: ReactNode;
}

function CartContext ({ children }:CartContextProps)  {
    const storageKey = 'cart'
    // @ts-ignore
    const [cart, dispatch] =useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },


    );

    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}
export default CartContext;