import { Fragment } from "react";//Essentially a component that renders to nothing - so we do not have to wrap our div within a div. 
import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import CLogo from "../../assets/calcifer.png";

// Outlet is basically like the child of the parent.
//Link is basically an <a></a> tag with extra functionality
const Navigation = () => {
    //In this example of the use of Fragment, we will see root div and then navigation div instead of ((div root) <-child of (div) <-child of(div navigation) <-sibling of (div category))
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to={'/'}>
                    <img src={CLogo} alt="Calcifer inc co." className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    <Link className="nav-link" to='/login'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;

// <img src={CLogo} alt="Calcifer inc co." className="logo" />