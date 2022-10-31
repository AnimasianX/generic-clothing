import { useNavigate } from "react-router-dom";
import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate();
    return (
        <div className="category-preview-container">
            <h2>
                <span className="title" onClick={() => navigate(`/shop/${title}`)}>{title.toUpperCase()}</span>
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