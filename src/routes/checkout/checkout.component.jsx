import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
const CheckOut = () => {
    const { cartItems, } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((item) => {
                    return (
                        <CheckoutItem key={item.id} cartItem={item} />
                    )
                })
            }
            <span className="total">Total: ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span>
        </div>

    )
}

export default CheckOut;