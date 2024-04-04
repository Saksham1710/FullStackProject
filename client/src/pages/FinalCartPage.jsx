import React, { useState, useEffect } from "react";
import "../styles/FinalCart.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AddressModal from "../components/AddressModal";
import Select from "react-select"; // Import React-Select
import imageCart from '../assets/Images/emptyCart.png';

export default function FinalCart() {
  const [cartItems, setCartItems] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // cannot select address and add new address at the same time

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/users/cart",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setCartItems(responseData.data);
          console.log("Cart items:", responseData.data);
        } else {
          console.error(
            "Failed to fetch cart items, status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/users/get-address",
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
          setAddresses(data.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);
  // implement stripe method for payment
const handlePayment = async () => {
    try {
        if (!cartItems || cartItems.length === 0) {
            console.error("Cart is empty");
            return;
        }

        const response = await fetch("http://localhost:4000/api/v1/users/payment", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: cartItems }), // Ensure cartItems is passed inside an object with key 'items'
        });

        if (response.ok) {
            const { url } = await response.json();
            window.location = url;

            const orderItems = cartItems.map((item) => ({
                product_id: item._id,
                quantity: item.quantity,
                price: item.price,
            }));

            const order = {
                userId: cartItems[0].userId, // Assuming all cart items have the same user ID
                addressId: selectedAddress,
                orderItems: orderItems, // Assign directly without wrapping in an array
                paymentMethod: "Credit Card",
                paymentResult: { id: Math.random().toString() },
                taxPrice: taxes,
                shippingPrice: 10,
                totalPrice: subtotal + 10,
                isPaid: true,
                paidAt: new Date(),
                isDelivered: false,
                deliveredAt: new Date(),
            };

            console.log("Order Items in payment route:", JSON.stringify(order));

            const res = await fetch("http://localhost:4000/api/v1/users/cart/add-order-to-cart", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderItem: order }), // Pass order object to store in the database
            });
            if (res.ok) {
                console.log("Order added to cart");
                // Clear cart items after successful payment
                setCartItems([]);
            } else {
                const errorData = await res.json();
                console.error("Error adding order to cart:", errorData);
            }
        } else {
            const errorData = await response.json();
            console.error("Error making payment:", errorData);
        }
    } catch (error) {
        console.error("Error making payment:", error);
    }
};




  const handleAddAddress = async (event) => {
    event.preventDefault();
    setShowAddressModal(!showAddressModal);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <NavBar />
        <div style={{background:'#f6f0e4'}}>
          <img src={imageCart} style={{width:'70vh', height:'70vh',display:'block', marginLeft:'auto',marginRight:'auto'}} alt="empty cart" />
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const taxRate = 0.12;
  const taxes = totalPrice * taxRate;
  const deliveryCharge=10;
  const subtotal = totalPrice + taxes + deliveryCharge;

  return (
    <div>
      <NavBar />
      <div className="checkout-container" style={{background:'#f6f0e4'}}>
        <div className="cart-items-container col-8">
          <h2>Cart Items</h2>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index}>
                <div className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity}</p>
                    {item.packing ? <p>Packing: {item.packing}</p> : <></>}
                    {item.mlQuantity ? <p>{item.mlQuantity}</p> : <></>}
                  </div>
                    <p style={{fontSize:'20px'}}>${item.price.toFixed(2)}</p>
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
              <div className="taxes">
                <span>Delivery Charges:</span>
                <span>${deliveryCharge.toFixed(2)}</span>
              </div>
              <br/>
              <hr></hr>
              <div className="total">
                <span>Total Payment:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="payment-options">
              <button id="stripe-pay" onClick={handlePayment}>Pay with Credit Card</button>
              <button>Pay with PayPal</button>
            </div>
          </div>
          <div className="checkout-summary">
            {addresses.length > 0 && !showAddressForm ? (
              <div>
                <h3>Select an Address</h3>
                <Select
                  // on clicking the dropdown, fetch the address first and then display it

                  options={addresses.map((address) => ({
                    key: address._id,
                    value: `${address.houseNumber},${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`,
                    label: `${address.houseNumber}, ${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`,
                  }))}
                  onChange={(selectedOption) =>
                    setSelectedAddress(selectedOption.value)
                  }
                  value={selectedAddress}
                />
                {/* now display the selected address in a label */}
                {selectedAddress !== null ? (
                  <label style={{margin:'15px'}}>{selectedAddress}</label>
                ) : (
                  <></>
                )}
                <button style={{marginTop:'15px'}} onClick={() => setShowAddressModal(true)}>
                  Add New Address
                </button>
              </div>
            ) : (
              <div>
                <h3>No Address Found</h3>
                <form onSubmit={handleAddAddress}>
                  <button
                    type="submit"
                    id="address-btn"
                    style={{
                      background: "transparent",
                      color: "black",
                      border: "2px solid",
                    }}
                  >
                    Add Address
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddressModal
        show={showAddressModal}
        handleClose={() => setShowAddressModal(false)}
      />
      <Footer />
    </div>
  );
}
