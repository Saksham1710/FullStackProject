import React, { useState, useEffect } from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBBtn, MDBCollapse } from "mdb-react-ui-kit";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdb-react-ui-kit";
import logo from "../assets/Images/onlyLogo.png";
import { Offcanvas } from 'react-bootstrap'; // Import Offcanvas from react-bootstrap
import "../styles/style.css";
import CartModal from "./CartModal";

export default function NavBar() {
  const [openBasic, setOpenBasic] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false); // State to control the visibility of the cart modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in or not
  const [userAvatar, setUserAvatar] = useState(null); // State to store the user's avatar

  useEffect(()=>{
    fetchUserLoginStatus();
  }, []);

  const fetchUserLoginStatus = async()=>{
    try{
      const response = await fetch('http://localhost:4000/api/v1/users/current-user');
      if(response.ok){
        const data = await response.json();
        setIsLoggedIn(true);
        setUserAvatar(data.user.avatar);
      }
    }catch(error){
      console.error('Error fetching user login status:', error);
    }
  }

  const toggleSearch = () => setShowSearch(!showSearch);

  // Function to toggle the visibility of the cart modal
  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  return (
    <MDBNavbar expand="lg" light bgColor="#6B240C" style={{ backgroundColor: '#fcf9f5' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img src={logo} alt="Brand logo" style={{ width: '50px', marginLeft: '10px' }} />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            {/* Your navigation links here */}
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/"  style={{fontSize:'18px'}}>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/shopping"  style={{fontSize:'18px'}}>Shop</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/about-us" style={{fontSize:'18px'}}>About Us</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href="/pricing" style={{fontSize:'18px'}}>Pricing</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{fontSize:'18px'}}>
                  Settings
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{backgroundColor:"#fcf9f5"}}>
                  <MDBDropdownItem link href="/accountSettings" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="user-circle" className="me-2" />Account Settings</MDBDropdownItem>
                  <MDBDropdownItem link href="/orderHistory" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="history" className="me-2" />Order History</MDBDropdownItem>
                  <MDBDropdownItem link href="/paymentMethods" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="credit-card" className="me-2" />Payment Methods</MDBDropdownItem>
                  <MDBDropdownItem link href="/shippingInfo" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="truck" className="me-2" />Shipping Information</MDBDropdownItem>
                  <MDBDropdownItem link href="/subscription" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="bell" className="me-2" />Subscription</MDBDropdownItem>
                  <MDBDropdownItem link href="/logout" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="sign-out-alt" className="me-2" />Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>


          <MDBNavbarNav className="ml-auto mb-2 mb-lg-0">
            <MDBNavbarItem style={{ marginLeft: "auto" }}>
              {/* Add onClick event handler to cart icon to toggle the cart modal */}
              <MDBNavbarLink onClick={toggleCartModal}>
                <span style={{ marginRight: "10px" }}>
                  <MDBIcon fas icon="shopping-cart" style={{ fontSize: '20px' }}></MDBIcon>
                </span>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ marginRight: "10px" }}>
              <MDBNavbarLink href="#" onClick={toggleSearch}>
                <MDBIcon fas icon="search" style={{ fontSize: '20px' }}></MDBIcon>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* Conditionally render sign-in button or user avatar */}
            {isLoggedIn ? (
              <MDBNavbarItem style={{marginTop:'auto', marginBottom:'auto'}}>
                {/* Render user avatar with initials */}
                <tag className="me-2" style={{ backgroundColor: 'green',padding:'10px', borderRadius:'50%', color:'white' }}>
                  {userAvatar && userAvatar.initials}
                </tag>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBBtn className="custom-btn" href="/login" style={{ backgroundColor: '#533e2d' }}>
                  Sign In
                </MDBBtn>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>

      {/* Offcanvas for search */}
      <Offcanvas show={showSearch} onHide={toggleSearch} placement="end" style={{ width: '40%' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{paddingTop:'10px',marginLeft:'10px',fontSize:'24px',paddingBottom:'0px'}}>Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Your styled search form here */}
          <form style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text" placeholder="What are you looking for?..." style={{ flex: 1, padding: '10px',paddingTop:'0px', border: 'none', borderBottom: '3px solid #ccc', marginRight: '10px', fontFamily:'open sans',fontSize:"20px" }} />
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Render CartModal component */}
      <CartModal show={showCartModal} toggleCartModal={toggleCartModal} />
    </MDBNavbar>
  );
}
