import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BottledProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [packing, setPacking] = useState('4x4');
  const [mlQuantity, setMlQuantity] = useState('250ml');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/beverages/` + productId);
        if (response.data) {
          console.log('Product:', response.data);
          setProduct(response.data);
          setPrice(response.data.price);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    console.log('Product added to cart:', product);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (product) {
      switch (mlQuantity) {
        case '330ml':
          setPrice(product.price + 1);
          break;
        case '500ml':
          setPrice(product.price + 1.5);
          break;
        case '700ml':
          setPrice(product.price + 2);
          break;
        default:
          setPrice(product.price);
          break;
      }
    }
  }, [mlQuantity, product]);

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
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '', marginBottom: '0px' }}>{product.name}</h2>
            <p style={{ fontSize: '18px', color: '', marginBottom: '10px' }}>{mlQuantity}</p>
            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>{product.description}</p>
            <div className="quantity-packing" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div className="quantity-selector" style={{ marginRight: '20px' }}>
                <label htmlFor="quantity" style={{ fontSize: '18px', marginRight: '10px' }}>Quantity:</label>
                <button onClick={decrementQuantity} className="btn btn-sm btn-secondary">-</button>
                <input type="number" id="quantity" value={quantity} readOnly style={{ fontSize: '16px', padding: '4px 0px', borderRadius: '5px', border: '1px solid #ccc', margin: '0 10px',width:'40px', textAlign:'end' }} />
                <button onClick={incrementQuantity} className="btn btn-sm btn-secondary">+</button>
              </div>
              <div className="packing-selector" style={{ marginRight: '20px' }}>
                <label htmlFor="packing" style={{ fontSize: '18px', marginRight: '10px' }}>Packing:</label>
                <select id="packing" value={packing} onChange={(e) => setPacking(e.target.value)} style={{ fontSize: '16px', padding: '4px 8px', borderRadius: '5px', border: '1px solid #ccc', margin: '0 10px' }}>
                  <option value="4x4">4x4 - 16 cans</option>
                  <option value="4x6">4x6 - 24 cans</option>
                  <option value="6x6">6x6 - 36 cans</option>
                  <option value="6x8">6x8 - 48 cans</option>
                </select>
              </div>
              <div className="ml-quantity-selector">
                <label htmlFor="mlQuantity" style={{ fontSize: '18px', marginRight: '10px' }}>Ml Quantity:</label>
                <select id="mlQuantity" value={mlQuantity} onChange={(e) => setMlQuantity(e.target.value)} style={{ fontSize: '16px', padding: '4px 8px', borderRadius: '5px', border: '1px solid #ccc', margin: '0 10px' }}>
                  <option value="250ml">250ml</option>
                  <option value="330ml">330ml</option>
                  <option value="500ml">500ml</option>
                  <option value="700ml">700ml</option>
                </select>
              </div>
            </div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Price: ${price}</p>
            
            <button onClick={handleAddToCart} className="btn btn-primary" style={{ fontSize: '18px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>Add to Cart</button>
            <div className="nutritional-values" style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Nutritional Values /1 serving (100ml)</h3>
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
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Sugars</td>
                      <td style={{ fontSize: '16px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>{product.nutritionalValues?.sugar}</td>
                    </tr>
                  </tbody>
                </table>
                <br/>
                <br/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default BottledProduct;
