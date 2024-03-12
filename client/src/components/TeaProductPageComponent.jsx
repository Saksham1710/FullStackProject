import React, { useState, useEffect } from 'react';
import coffees from '../assets/Data/CoffeeData'; // Import your data source
import teas from '../assets/Data/TeaData';
import cart from '../assets/Data/CartData';
import axios from 'axios';

const TeaProductPageComponent = ({productId}) => {// Extract productId from URL params
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]); // State to manage cart items

  // Function to handle adding items to the cart
  const addToCart = (newItem) => {
    setCartItems([...cartItems, newItem]);
  };
  let SingleRaay = coffees.concat(teas);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/teas/`+productId);
        if (response.data) {
          console.log('Product:', response.data);
          setProduct(response.data);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [productId]);
  

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculatePrice = () => {
    return product ? (product.pricePer10lb * quantity).toFixed(2) : 0;
  };

  const handleAddToCart = () => {
    if (product) {
      const newItem = {
        id: product.id,
        name: product.title,
        quantity: quantity,
        price: calculatePrice(), // Calculate the price based on quantity
        image: product.image,
        weight: '10 lb' // Assuming the weight is constant for all products
      };
      cart.push(newItem);
      console.log("Item pushed to the cart \n"+(JSON.stringify(newItem)));// Add the new item to the cart

      console.log("Cart Items \n"+(JSON.stringify(cart)));
    }
  };
  
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ marginTop: '10vh', marginBottom: '10vh' }}>
      <div className="row">
        <div className="col-md-6">
          <div className="product-image">
            <img src={product.image} style={{ width: "100%", borderRadius:'20px' }} alt={product.title} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '', marginBottom: '20px' }}>{product.title}</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>{product.description}</p>
            <p style={{ fontSize: '18px', color: '', marginBottom: '10px' }}>Weight: 10lb</p>
            <div className="quantity-selector" style={{ marginBottom: '20px' }}>
              <label htmlFor="quantity" style={{ fontSize: '18px', marginRight: '10px' }}>Quantity:</label>
              <button onClick={() => handleQuantityChange('decrease')} className="btn btn-sm btn-secondary">-</button>
              <input type="number" id="quantity" value={quantity} readOnly style={{ fontSize: '16px', padding: '4px 0px', borderRadius: '5px', border: '1px solid #ccc', margin: '0 10px',width:'40px', textAlign:'end' }} />
              <button onClick={() => handleQuantityChange('increase')} className="btn btn-sm btn-secondary">+</button>
            </div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Price: ${product.pricePer10lb}</p>
            <button onClick={handleAddToCart} className="btn btn-primary" style={{ fontSize: '18px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>Add to Cart</button>
            <div className="nutritional-values" style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Nutritional Values /8oz</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #333', padding: '10px 0' }}>Nutrient</th>
                      <th style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #333', padding: '10px 0' }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Calories</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.calories}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Protein</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.protein}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Fat</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.fat}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Carbohydrates</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.carbohydrates}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Fiber</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.fiber}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Sugars</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.sugars}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Sodium</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.sodium}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Cholesterol</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.cholesterol}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Caffeine (mg)</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.caffeine}</td>
                    </tr>
                  </tbody>
                </table>
                <br/>
                <br/>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #333', padding: '10px 0' }}>Vitamins</th>
                      <th style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #333', padding: '10px 0' }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>vitaminA</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.vitamins.vitaminA}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>vitaminC</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.vitamins.vitaminC}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Calcium</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.vitamins.calcium}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Iron</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.vitamins.iron}</td>
                    </tr>
                  </tbody>
                  </table>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TeaProductPageComponent;
