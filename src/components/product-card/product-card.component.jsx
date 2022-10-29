import "./product-card.styles.scss";
import Button from "../button/button.component";

const ProductCard = ({ product: { name, imageUrl, price } }) => {
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}></img>
            <div className="footer">
                <span className="product-name">{name}</span>
                <span className="product-price">{price}</span>
            </div>
            <Button buttonType='inverted'>Add to cart</Button>
        </div>
    )
}

export default ProductCard;