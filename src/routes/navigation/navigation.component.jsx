import { Fragment } from "react";//Essentially a component that renders to nothing - so we do not have to wrap our div within a div. 
import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { useContext } from "react";
import CLogo from "../../assets/calcifer.png";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

// Outlet is basically like the child of the parent.
//Link is basically an <a></a> tag with extra functionality
const Navigation = () => {
    const { currentUser, } = useContext(UserContext);
    const { isToggled, } = useContext(CartContext);


    //In this example of the use of Fragment, we will see root div and then navigation div instead of ((div root) <-child of (div) <-child of(div navigation) <-sibling of (div category))
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to={'/'}>
                    <img src={CLogo} alt="Calcifer inc co." className="logo" />
                </Link>
                <Link to={'/checkout'}></Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                        ) :
                            <Link className="nav-link" to='/login'>
                                SIGN IN
                            </Link>

                    }
                    <CartIcon />
                </div>
                {isToggled &&
                    <CartDropdown />
                }

            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;

// <img src={CLogo} alt="Calcifer inc co." className="logo" />