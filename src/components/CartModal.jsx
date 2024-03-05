import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartItem from "./CartItem";
import {BrazilianSantos,
ColombianSupremo,
CostaRicanTarrazu,
EthiopianYirgacheffe,
GuatemalanAntigua,
HawaiianKona,
JamaicanBlueMountain,
KenyanAA,
MexicanAltura,
SumatranMandheling,
greenTea,
blackTea,
oolongTea,
whiteTea,
herbalTea,
chaiTea,
earlGreyTea,
jasmineTea,
peppermintTea,
rooibosTea,
matchaTea,
hibiscusTea,
lemonGingerTea,
turmericTea,
chamomileTea,} from "../assets/Data/images";

function CartModal({ show, toggleCartModal }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Brazilian Santos", quantity: 1, price:'$55', image: BrazilianSantos, weight: "10 lb" },
    { id: 2, name: "Chai Tea", quantity: 1, price: "$56", image: chaiTea, weight: "10 lb" },
    { id: 3, name: "Colombian Supremo", quantity: 1, price: "$57", image: ColombianSupremo, weight: "10 lb" },
    { id: 4, name: "Costa Rican Tarrazu", quantity: 1, price: "$58", image: CostaRicanTarrazu, weight: "10 lb" },
  ]);

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
