import React, { useState, useEffect } from "react";
import "../styles/FinalCart.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AddressModal from "../components/AddressModal";

export default function FinalCart() {
  const [cartItems, setCartItems] = useState([]); // Create a state variable to store the cart items
  const [showAddressModal, setShowAddressModal] = useState(false); // Create a state variable to control the visibility of the address modal
  const [addresses, setAddresses] = useState([]); // To store fetched addresses
  const [selectedAddress, setSelectedAddress] = useState(null); // To store the user's selected address
  const [showAddressForm, setShowAddressForm] = useState(false); // To toggle the new address form

  // Inside your component
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/users/cart",
          {
            method: "GET",
            credentials: "include", // Necessary for sending cookies in cross-origin requests
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setCartItems(responseData.data);
        } else {
          // Handle non-2xx responses
          console.error("Failed to fetch cart items, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/users/addresses",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAddresses(data.addresses);
          // Automatically select the first address if available
          if (data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []); // Dependency array is empty to fetch only on component mount

  const handleAddAddress = async (event) => {
    event.preventDefault();
    setShowAddressModal(!showAddressModal); // Close the modal after adding the address
  };
  

  if (!cartItems || cartItems.length === 0) {
    console.log("showAddressModal:", showAddressModal);
    return (
      <div>
        <NavBar />
        <p>No items in the cart.</p>
        <Footer />
      </div>
    );
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const taxRate = 0.12; // Assuming 10% tax rate
  const taxes = totalPrice * taxRate;
  const subtotal = totalPrice + taxes;
  console.log("showAddressModal:", showAddressModal);

  return (
    <div>
      <NavBar />

      <div className="checkout-container">
        <div className="cart-items-container col-8">
          <h2>Cart Items</h2>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index}>
                <div className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="checkout-summary-container col-4">
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-box">
              <div className="subtotal">
                <span>Before Taxes:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="taxes">
                <span>Taxes:</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="total">
                <span>Total Payment:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="payment-options">
              <button>Pay with Credit Card</button>
              <button>Pay with PayPal</button>
            </div>
          </div>
          <div className="checkout-summary">
            {addresses.length > 0 && !showAddressForm ? (
              <div>
                <h3>Select an Address</h3>
                <select
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  value={selectedAddress}
                >
                  {addresses.map((address, index) => (
                    <option key={index} value={address}>
                      {address}
                    </option>
                  ))}
                </select>
                <button onClick={() => setShowAddressModal(true)}> {/* Show the modal when this button is clicked */}
                  Add New Address
                </button>
              </div>
            ) : (
              <div>
                <h3>No Address Found</h3>
                
                <form onSubmit={handleAddAddress}>
                  <button type="submit" id="address-btn" style={{background:'transparent', color:'black', border:'2px solid'}}>Add Address</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Render the AddressModal component */}
      <AddressModal show={showAddressModal} handleClose={() => setShowAddressModal(false)} />
              
      <Footer />
    </div>
  );
}
