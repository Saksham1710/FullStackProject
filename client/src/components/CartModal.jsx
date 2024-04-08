import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartItem from "./CartItem";
import "../styles/cartStyle.css";


function CartModal({ show, toggleCartModal }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  //Function to fetch the items from db to cart
  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/users/cart", {
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

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/users/cart/updateQty/${itemId}/${quantity}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        console.error("Error updating quantity: ", data.message);
      }
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/users/cart/remove/${itemId}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        console.log("Item removed from cart: ", data.message);
      } else {
        console.error("Error removing item from cart: ", data.message);
      }
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchCartItems();
    }
  }, [show]);

// Calculate total price whenever cartItems change
useEffect(() => {
  const totalPrice = cartItems.reduce((total, item) => {
    // Check the product type
    if (item.type === 'bottled') {
      // If the product type is bottled, consider the regular price
      return total + (item.price * item.quantity);
    } else {
      // For other product types like coffee or tea, consider pricePerPiece
      return total + (item.pricePerPiece * item.quantity);
    }
  }, 0);
  setCartTotalPrice(totalPrice);
}, [cartItems]);



  // Function to increase the quantity of an item
  const increaseQuantity = (item) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
    updateQuantity(item._id, item.quantity + 1);
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
    updateQuantity(item._id, item.quantity - 1);
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem._id !== itemId);
    setCartItems(updatedCartItems);
    removeFromCart(itemId);
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
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
  <div style={{ fontSize: "20px", color: "red" }}>Total Price: ${cartTotalPrice.toFixed(2)}</div>
  <Button variant="danger" onClick={toggleCartModal} href="/api/v1/users/cart/finalPage">
    Checkout
  </Button>
</Modal.Footer>



      </Modal>
    </>
  );
}

export default CartModal;
