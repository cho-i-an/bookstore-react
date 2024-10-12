import {ShoppingCartItem, BookItem} from "../types";
import {Dispatch, ReducerAction} from "react";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR'
};

export type AppActions = {
    id: number;
    type: 'ADD' | 'REMOVE' | 'CLEAR';
    book: BookItem;
}

export const initialCartState: ShoppingCartItem[] = [];


const findItem = (cart: any[], id: number) => cart.find((book) => book.id === id);

export const cartReducer = (state: ShoppingCartItem[],action: { type: any; book: { bookId: number; }; id: any; }) => {
    let newState: ShoppingCartItem[];
    // console.log("HHHH")
    switch (action.type) {
        case CartTypes.ADD:


            if (findItem(state, action.book.bookId)) {

                const newState = state.map((book) => book.id === action.book.bookId ? {
                    ...book,
                    quantity: book.quantity + 1
                } : book);


                localStorage.setItem('cart', JSON.stringify(newState));

                return newState;
            } else {
                const newState = [
                    ...state,
                    {
                        id: action.id,
                        book: action.book,
                        quantity: 1
                    }
                ];

                localStorage.setItem('cart', JSON.stringify(newState));

                // ];
                return newState;
            }



        case CartTypes.REMOVE:

            /*
               will be defiend in Project 7
             */
            if (findItem(state, action.book.bookId)) {
                const newState = state.map((book) =>
                    book.id === action.book.bookId
                        ? { ...book, quantity: book.quantity - 1 }
                        : book
                )
                    .filter((book) => book.quantity >= 1);

                localStorage.setItem('cart', JSON.stringify(newState));
                return newState

            }else{
                localStorage.setItem('cart', JSON.stringify(state));
                return state
            }


        case CartTypes.CLEAR:
            const newState = initialCartState
            localStorage.setItem('cart', JSON.stringify(newState));
            // state = initialCartState;
            return newState;
        default:
            throw new Error(`Invalid action type ${action.type}`);


    }

};