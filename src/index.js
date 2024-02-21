import React from 'react';
import ReactDOM from 'react-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.jsx';
import HomePage from './pages/HomePage.jsx';



const router=createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>,
        errorElement: <NotFoundPage />
    },
    {
        path:"/register",
        element:<Register/>,
    },
    {
        path:"/login",
        element:<Login/>,
    },

]);


ReactDOM.render(
        <RouterProvider router={router} />,
        document.getElementById("root")
        );





