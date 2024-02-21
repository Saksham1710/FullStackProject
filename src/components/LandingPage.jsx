import React from 'react';
import Slider from 'react-slick'; // Import the slider component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '../assets/ImageData';

const LandingPage = () => {
  // Define settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // Array of coffee pictures


  return (
    <div>
      <nav>
        {/* Navbar content */}
      </nav>
      <Slider {...sliderSettings}>
      {/* Map through the images array and display each image in the slider */}
      {images.map((image,index)=>{
        return (<div>
            <img src={image} alt={`Coffee ${index+1}`} style={{ width: '100vw', height: '90vh', objectFit: 'cover' }} />
            {console.log(image)}
        </div>)
      })}
        
       
      </Slider>
    </div>
  );
};

export default LandingPage;
