import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    cart: null,
    setCart: () => null,
    isToggled: null,
    setIsToggled: () => { },
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isToggled, setIsToggled] = useState(false);
    const value = { cart, setCart, isToggled, setIsToggled };



    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}