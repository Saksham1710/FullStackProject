import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import '../styles/orderHistory.css';
import noorderImage from '../assets/Images/NoOrders2.png'

const OrderItem = ({ order }) => {
    return (
      <div className="order-item">
        <h3>Order ID: {order._id}</h3>
        <div className="order-details">
          <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Items: {order.orderItems.length}, ({order.orderItems.map(itemName => itemName.product_id + ",\t")}) </p>
          {/* Add more order details as needed */}
        </div>
        <div className="order-address">
          <p>Delivery Address: {order.addressId}</p>
          <p></p>
        </div>
      </div>
    );
};

function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/users/get-order-history", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrderHistory(data.data);
                } else {
                    console.error("Failed to fetch order history");
                }
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/users/current-user", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    const userInfo=JSON.parse(userData.data);
                    setUserName(userInfo.firstName + " " + userInfo.lastName);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchOrderHistory();
        fetchUserData();
    }, []);

    return (
        <>
          <Navbar />
          <div className="container" style={{ minHeight: '70vh' }}>
            {orderHistory.length > 0 && <h2>Order History -  {userName}</h2>}
            <div className="order-history">
              {orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <OrderItem key={order._id} order={order} />
                ))
              ) : (
                <img src={noorderImage} alt="No Orders" style={{ width: '70vw' }} />
              )}
            </div>
          </div>
          <Footer />
        </>
      );
      
}

export default OrderHistory;
