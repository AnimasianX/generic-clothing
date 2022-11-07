import { createContext, useState, useReducer} from "react";
import { createAction } from '../utils/reducer/reducer.utils';

//main point of a reducer is to make it easier to update multiple objects in our state. 
//for example if we were to have cartCount and cartTotal, we would want to use reducers instead of 
//usestate because it would be easier to 

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

export const CART_ACTION_TYPES = { //Cart action types - User defined
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) =>{// 
    const {type, payload} = action;
    
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,//state in this case will include all other variables we declare in our initial state
                //payload in this case is what we want to update in the state - in our case, the cart items. 
                //everything else will remain in the previous state unless changed in the case below 
                //where we check if we want to show cart based off of user clicks.
                ...payload//updates cart 
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                 ...state,//cart remains the same
                 isToggled: payload//toggle changes from true -> false and vice versa
            }
        default:
            throw new Error(`Unhandled error of ${type} in cart context `);
    }
}

const INITIAL_STATE = {
    cartItems: []  ,
    isToggled: false ,
}

export const CartProvider = ({ children }) => {
    // const [cartItems, setCartItems] = useState([]);
    // const [isToggled, setIsToggled] = useState(false);
    const [{cartItems, isToggled} , dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    

    const updateCartItemsReducer = (cartItems) =>{
        const payload = {
            cartItems,
        }
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload))
    }

    const setIsToggled = (bool) =>{

        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool))
   }

    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems,product);
        updateCartItemsReducer(newCartItems);//when we add new item to cart, we call this reducer to 
        //dispatch a new action to update the state with our new items in the cart
    }

    const decrementItemFromCart = (product) => {
        const newCartItems = decrementCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);// when we decrease item from the cart, we call reducer to 
        //dispatch new action to update the current states cart with new values for new state.
        //this function basically decrease quantity from the cart and then sets new state with updated quantity value.
    }

    const removeProductFromCart = (product) => {
        const newCartItems = removeItemFromCart(cartItems,product);
        updateCartItemsReducer(newCartItems);
    }
    const value = { cartItems, addItemToCart, decrementItemFromCart, removeProductFromCart, isToggled, setIsToggled };



    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}