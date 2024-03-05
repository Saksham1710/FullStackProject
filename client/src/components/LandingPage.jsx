import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import slideshow1 from '../assets/Images/slideshow1.jpg';
import slideshow2 from '../assets/Images/slideshow2.jpg';
import slideshow3 from '../assets/Images/slideshow3.jpg';
import slideshow4 from '../assets/Images/slideshow4.jpg';

export default function LandingPage() {
  const carouselHeight = `calc(100vh - 56px)`; // Adjust the 56px according to your layout (header/footer height)

  return (
    <MDBCarousel showControls fade>
      <MDBCarouselItem itemId={1}>
        <img src={slideshow1} className='d-block w-100' style={{ height: "70vh" , objectFit:"cover"}} alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={slideshow2} className='d-block w-100' style={{ height: "70vh" ,objectFit:"cover"}} alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={slideshow3} className='d-block w-100' style={{ height: "70vh",objectFit:"cover" }} alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={4}>
        <img src={slideshow4} className='d-block w-100' style={{ height: "70vh" , objectFit:"cover"}} alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
  );
}
