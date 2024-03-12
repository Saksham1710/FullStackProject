import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductPageComponent from "../components/ProductPageComponent";
import BottledProduct from "../components/BottledProduct";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";

function ProductPage() {
    const { productId } = useParams();
    console.log(productId);
    const [cartItems, setCartItems] = useState([]);
    let data=[];
    //fetch the product based on productId
     const fetchProduct = async () => {
         try {
            const response = await axios.get(`http://localhost:4000/api/v1/coffees/`+productId);
            if (response.data) {
              console.log('Product:', response.data);
              data.push(response.data);
            } else {
              throw new Error('Product not found');
            }
         } catch (error) {
            console.error('Error fetching product:', error.message);
         }
      };

      fetchProduct();



    return (
        <div>
            <Navbar />
            <ProductPageComponent productId={productId} setCartItems={setCartItems} />
            <Footer />
        </div>
    );
}

export default ProductPage;
