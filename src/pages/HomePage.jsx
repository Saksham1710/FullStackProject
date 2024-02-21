import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import LandingPage from "../components/LandingPage";


function HomePage(){
    return (<div>
    <Navbar />
    <LandingPage />
    <Footer />
    </div>);
}

export default HomePage;