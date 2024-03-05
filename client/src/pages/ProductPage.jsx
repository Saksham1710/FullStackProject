import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductPageComponent from "../components/ProductPageComponent";
import BottledProduct from "../components/BottledProduct";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function ProductPage() {
    const { productId } = useParams();
    console.log(productId);
    const [cartItems, setCartItems] = useState([]);

    return (
        <div>
            <Navbar />
            {/* Conditional rendering based on productId */}
            {parseInt(productId) > 25 ? (
                <BottledProduct productId={productId} />
            ) : (
                <ProductPageComponent productId={productId} setCartItems={setCartItems} />
            )}
            <Footer />
        </div>
    );
}

export default ProductPage;
