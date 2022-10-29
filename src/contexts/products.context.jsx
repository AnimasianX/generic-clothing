import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    useEffect(() => {
        //we use effect to modify products when we call api once. but i was just testing if this works and it does.
        console.log("setting products");
        setProducts(PRODUCTS);
    }, [])

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}