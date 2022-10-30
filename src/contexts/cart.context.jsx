import { createContext, useState, } from "react";


const addCartItem = (cartItems, product) => {
    //find if cart items contains product to add
    const itemExist = cartItems.find(({ id }) => id === product.id);
    //if found, increase quantity

    if (itemExist) {
        return cartItems.map((cartItem) => cartItem.id === product.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem);
    }
    //finally return new array with modified cart items/quantity
    return [...cartItems, { ...product, quantity: 1 }];
}

export const CartContext = createContext({
    cartItems: null,
    addItemToCart: () => { },
    isToggled: null,
    setIsToggled: () => { },
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isToggled, setIsToggled] = useState(false);

    const addItemToCart = (product) => {

        setCartItems(addCartItem(cartItems, product))
    }

    const value = { cartItems, addItemToCart, isToggled, setIsToggled };



    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}