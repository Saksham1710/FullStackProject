import React from 'react';
import ReactDOM from 'react-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ShoppingPage from './pages/ShoppingPage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ProductPage from './pages/ProductPage.jsx';

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
        path: "/product/:productId", // Define the route for the product detail page
        element: <ProductPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

ReactDOM.render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>,
    document.getElementById("root")
);
