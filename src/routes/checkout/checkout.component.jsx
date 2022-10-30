import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CheckOut = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-fields">
                <span>Product</span>
                <span>Description</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Remove</span>
            </div>
            <div>
                {
                    cartItems.map((item) => (
                        <div key={item.id} className="checkout-items">
                            <img src={item.imageUrl} alt={item.name}></img>

                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default CheckOut;