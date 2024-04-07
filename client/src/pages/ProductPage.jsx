import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductPageComponent from "../components/ProductPageComponent";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";

function ProductPage() {
  const { productId } = useParams();
  console.log(productId);


  const [userId, setUserId] = useState(''); // State to store the user's ID
    //fetch the current user
    const fetchUser = async () => {
        try {
            const response = await fetch('https://full-stack-project-backend.vercel.app/api/v1/users/current-user', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                const parseData= JSON.parse(responseData.data);
                setUserId(parseData._id);
                console.log('User ID coffee:', parseData._id);
                console.log('User ID coffee:', userId);
                
            }
        } catch (error) {
            console.error('Error fetching user login status:', error);
        }
    }
    fetchUser();






    

    let data=[];
    //fetch the product based on productId
     const fetchProduct = async () => {
         try {
            const response = await axios.get(`https://full-stack-project-backend.vercel.app/api/v1/coffees/`+productId);
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
            <ProductPageComponent productId={productId} userId={userId} />
            <Footer />
        </div>
    );
}

export default ProductPage;
