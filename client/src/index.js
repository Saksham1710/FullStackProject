import React from 'react';
import ReactDOM from 'react-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ShoppingPage from './pages/ShoppingPage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ProductPageBottle from './pages/ProductPageBottle.jsx';
import ProductPageTea from './pages/ProductPageTea.jsx';
import FinalCart from './pages/FinalCartPage.jsx';
import OrderHistory from './pages/OrderHistoryPage.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/shopping",
        element: <ShoppingPage />,
    },
    {
        path: "/about-us",
        element: <AboutUs />,
    },
    {
        path: "/api/v1/beverages/:productId",
        element: <ProductPageBottle />,
    },
    {
        path: "/api/v1/coffees/:productId",
        element: <ProductPage />,
    },
    {
        path: "/api/v1/teas/:productId",
        element: <ProductPageTea />,
    },
    {
        path: "/api/v1/users/cart/finalPage",
        element: <FinalCart />
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "api/v1/users/order-history",
        element: <OrderHistory />
    }
]);

ReactDOM.render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>,
    document.getElementById("root")
);
