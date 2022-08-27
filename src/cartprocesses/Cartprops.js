import React, { createContext, useReducer } from 'react'
import { Cartactions } from './Cartactions'

export const Cartprops = createContext();

export const CartpropsProvider = (props) => {

    const [cart, dispatch] = useReducer(Cartactions, { shoppingCart: [], totalPrice: 0, totalQty: 0 , totalPoints:0})

    return (
        <Cartprops.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </Cartprops.Provider>
    )
}