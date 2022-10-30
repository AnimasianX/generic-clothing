import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
const CartIcon = () => {
    const { isToggled, setIsToggled, cartItems } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsToggled(!isToggled);
    const getQuantity = () => cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{getQuantity()}</span>
        </div>
    )
}

export default CartIcon;