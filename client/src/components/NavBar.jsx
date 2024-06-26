import React, { useState, useEffect } from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBBtn, MDBCollapse } from "mdb-react-ui-kit";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdb-react-ui-kit";
import logo from "../assets/Images/onlyLogo.png";
import { Offcanvas } from 'react-bootstrap'; // Import Offcanvas from react-bootstrap
import "../styles/style.css";
import CartModal from "./CartModal";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function NavBar() {
  const [openBasic, setOpenBasic] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false); // State to control the visibility of the cart modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in or not
  //const [userAvatar, setUserAvatar] = useState(null); // State to store the user's avatar
  const [userInitials, setUserInitials] = useState(""); // State to store the user's initials
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchUserLoginStatus = async () => {
      try {
        const response = await fetch('https://full-stack-project-backend.vercel.app/api/v1/users/current-user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        //console.log(response);
        if (response.ok) {
          const responseData = await response.json();
          //console.log('User login status:', responseData);
          setIsLoggedIn(true);
          
          // Parse the data field
          const userData = JSON.parse(responseData.data);
          
          const initials = (userData.firstName.charAt(0) + userData.lastName.charAt(0));
          setUserInitials(initials.toUpperCase());
          //console.log('User initials:', initials);
          //setUserAvatar(data.user.avatar);
        }
      } catch (error) {
        console.error('Error fetching user login status:', error);
      }
    };
  
  fetchUserLoginStatus()}, []);

  


  const toggleSearch = () => setShowSearch(!showSearch);


  // Function to toggle the visibility of the cart modal
  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  // Function to handle user logout
  
  const handleLogout = async () => {
  
    try {
      const response = await fetch('https://full-stack-project-backend.vercel.app/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setIsLoggedIn(false);
        notify("You have been logged out successfully!");
        navigate('/');
        
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const notify = (message) =>
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
  

  return (
    <MDBNavbar expand="lg" light bgColor="#6B240C" style={{ backgroundColor: '#fcf9f5' }}>
    <ToastContainer />
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
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{fontSize:'18px'}}>
                  Settings
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{backgroundColor:"#fcf9f5"}}>
                  <MDBDropdownItem link href="/api/v1/users/profile" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="user-circle" className="me-2" />Account Settings</MDBDropdownItem>
                  <MDBDropdownItem link href="/api/v1/users/order-history" style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="history" className="me-2" />Order History</MDBDropdownItem>
                  <MDBDropdownItem link onClick={handleLogout} style={{fontSize:"16px", fontFamily:'open sans', margin:'5px'}}><MDBIcon fas icon="sign-out-alt" className="me-2" />Logout</MDBDropdownItem>
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
                <p className="me-2" style={{ backgroundColor: 'green',padding:'10px', borderRadius:'50%', color:'white' }}>
                  {userInitials}
                </p>
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
