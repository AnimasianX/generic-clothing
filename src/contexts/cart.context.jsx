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

const decrementCartItem = (cartItems, product) => {
    //find if cart item contains product
    const itemExist = cartItems.find(({ id }) => id === product.id);
    //if found, decrease quantity

    if (itemExist && itemExist.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === product.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem);
    } else {
        //removes if quantity is not greater than 1
        return cartItems.filter((cartItem) => cartItem.id !== product.id);
    }

}

//removes a whole item from cart rather than decreasing.
const removeItemFromCart = (cartItems, product) => {
    const newArray = cartItems.filter((cartItem) => cartItem.id !== product.id);
    return newArray;
}

export const CartContext = createContext({
    cartItems: null,
    addItemToCart: () => { },
    decrementCartItem: () => { },
    removeItemFromCart: () => { },
    isToggled: null,
    setIsToggled: () => { },
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isToggled, setIsToggled] = useState(false);

    const addItemToCart = (product) => {

        setCartItems(addCartItem(cartItems, product));
    }

    const decrementItemFromCart = (product) => {
        setCartItems(decrementCartItem(cartItems, product));
    }

    const removeProductFromCart = (product) => {
        setCartItems(removeItemFromCart(cartItems, product));
    }
    const value = { cartItems, addItemToCart, decrementItemFromCart, removeProductFromCart, isToggled, setIsToggled };



    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}