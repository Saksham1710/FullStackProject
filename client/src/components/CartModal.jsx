import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartItem from "./CartItem";
import "../styles/cartStyle.css"


function CartModal({ show, toggleCartModal }) {
  const [cartItems, setCartItems] = useState([]);

  //Function to fetch the items from db to cart
  const fetchCartItems = async () => {
    try {
      const response=await fetch("http://localhost:4000/api/v1/users/cart", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
       const data = await response.json(); // Parse the response as JSON
       if (data.success) {
        setCartItems(data.data); // Set cart items to the array of items from the API response
      } else {
        console.error("Error fetching cart items: ", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };
  
  useEffect(() => {
    if(show){
    fetchCartItems()
    }
  }, [show]);



  console.log("Cart ITems: ",cartItems);
  // Function to increase the quantity of an item
  const increaseQuantity = (item) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem._id === item._id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem._id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <Modal show={show} onHide={toggleCartModal} dialogClassName="cart-modal">
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="cart-modal-body">
        <div className="cart-item-list">
          {cartItems.map(item => (
            <CartItem
              key={item._id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={removeItem}
            />
          ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-center">
            <Button variant="danger" onClick={toggleCartModal}>
              Checkout
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartModal;
