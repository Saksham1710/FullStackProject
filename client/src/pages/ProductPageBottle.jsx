import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BottledProduct from "../components/BottledProduct";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";

function ProductPageBottle() {
    const { productId } = useParams();
    console.log(productId);
    const [cartItems, setCartItems] = useState([]);
    let data=[];
    //fetch the product based on productId
     const fetchProduct = async () => {
         try {
            const response = await axios.get(`http://localhost:4000/api/v1/beverages/`+productId);
            if (response.data) {
              //console.log('Product:', response.data);
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
            <BottledProduct productId={productId} />
            <Footer />
        </div>
    );
}

export default ProductPageBottle;
