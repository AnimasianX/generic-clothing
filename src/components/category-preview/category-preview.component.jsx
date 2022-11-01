import { Link } from "react-router-dom";
import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
    //(`/shop/${title}`)
    return (
        <div className="category-preview-container">
            <h2>
                <Link to={(`/shop/${title}`)} >
                    <span className="title" >{title.toUpperCase()}</span>
                </Link>
            </h2>
            <div className="preview">
                {
                    products.filter((_, idx) => idx < 4)
                        .map((item) => (
                            <ProductCard key={item.id} product={item} />
                        )
                        )
                }
            </div>
        </div>
    )
}

export default CategoryPreview;