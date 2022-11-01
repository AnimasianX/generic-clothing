import { Link } from 'react-router-dom';
import "./category-item.styles.scss";


const CategoryItem = ({ category: { title, imageUrl } }) => {
    return (
        <div className="category-container">

            <div className="background-image" style={
                {
                    backgroundImage: `url(${imageUrl})`
                }
            } />
            <div className="category-body-container">
                <Link to={(`/shop/${title}`)}>
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                </Link>
            </div>

        </div>
    )
}

export default CategoryItem;