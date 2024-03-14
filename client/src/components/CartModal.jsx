import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartItem from "./CartItem";


function CartModal({ show, toggleCartModal }) {
  const [cartItems, setCartItems] = useState([]);

  //Function to fetch the items from db to cart
  
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/cart/check");
        const data = await response.json();
        console.log("Data: ",data)
        setCartItems(data);
        console.log("Cart items: ", data);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    }
    fetchCartItems()
  }, []);
  // Function to increase the quantity of an item
  const increaseQuantity = (item) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <Modal show={show} onHide={toggleCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={removeItem}
            />
          ))}
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
