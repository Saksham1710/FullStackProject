import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import logo from '../assets/onlyLogo.png';

export default function Footer() {
  return (
    <MDBFooter bgColor='#EAC696' className='text-center text-lg-start text-muted' style={{backgroundColor: '#fcf9f5'}}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Connect with us:</span>
        </div>

        <div>
          <a href='https://facebook.com' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://twitter.com' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='https://instagram.com' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://linkedin.com' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="12" lg="6" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <img src={logo} alt='MDB logo' style={{ height: '15px' , marginRight:'5px'}} />
                BrewBox Co.
              </h6>
              <p className="text-muted">
                Your destination for premium blends and curated selections of tea, coffee, and bottled beverages. Elevate your everyday moments with our exquisite flavors.
              </p>
            </MDBCol>

            <MDBCol md="6" lg="3" className='mx-auto mb-4'>
  <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
  <p>
    <Link to='/pricing' className='text-reset text-muted'>
      Pricing
    </Link>
  </p>
  <p>
    <Link to='/settings' className='text-reset text-muted'>
      Settings
    </Link>
  </p>
  <p>
    <Link to='/orders' className='text-reset text-muted'>
      Orders
    </Link>
  </p>
  <p>
    <Link to='/help' className='text-reset text-muted'>
      Help
    </Link>
  </p>

</MDBCol>


            <MDBCol md="6" lg="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p className="text-muted">
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p className="text-muted">
                <MDBIcon icon="envelope" className="me-3" />
                info@brewboxco.com
              </p>
              <p className="text-muted">
                <MDBIcon icon="phone" className="me-3" /> +1 234 567 890
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: '#C8AE7D' }}>
        <p className="text-muted">© {new Date().getFullYear()} BrewBox Co. All rights reserved.</p>
      </div>
    </MDBFooter>
  );
}
