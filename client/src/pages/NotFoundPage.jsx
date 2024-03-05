import React from 'react';
import { Link } from 'react-router-dom';
import imagePageNotFound from '../assets/Images/404.png';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div>
      <NavBar />
      <div style={{textAlign:"center"}}>
      <Link to="/" ><img src={imagePageNotFound} alt="Page Not Found" style={{ width: '70vw' , height: '70vh', objectFit:'contain'}} /></Link>
      <p style={{fontSize: '24px'}}>Sorry, the page you are looking for does not exist.</p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
