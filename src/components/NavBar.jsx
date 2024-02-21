import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBadge,
} from "mdb-react-ui-kit";
import logo from "../assets/onlyLogo.png";

export default function NavBar() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="#6B240C" style={{backgroundColor: '#fcf9f5'}}>
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
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="#">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">Shop</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">About Us</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href="#">Pricing</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Settings
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href="/accountSettings"><MDBIcon fas icon="user-circle" className="me-2" />Account Settings</MDBDropdownItem>
                  <MDBDropdownItem link href="/orderHistory"><MDBIcon fas icon="history" className="me-2" />Order History</MDBDropdownItem>
                  <MDBDropdownItem link href="/paymentMethods"><MDBIcon fas icon="credit-card" className="me-2" />Payment Methods</MDBDropdownItem>
                  <MDBDropdownItem link href="/shippingInfo"><MDBIcon fas icon="truck" className="me-2" />Shipping Information</MDBDropdownItem>
                  <MDBDropdownItem link href="/subscription"><MDBIcon fas icon="bell" className="me-2" />Subscription</MDBDropdownItem>
                  <MDBDropdownItem link href="/logout"><MDBIcon fas icon="sign-out-alt" className="me-2" />Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            
          </MDBNavbarNav>

          <MDBNavbarNav className="ml-auto mb-2 mb-lg-0">
            <MDBNavbarItem style={{ marginLeft: "auto" }}>
              <MDBNavbarLink href="#" >
                <span style={{ marginRight: "10px" }}>
                  <MDBIcon fas icon="shopping-cart"></MDBIcon>
                </span>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ marginRight: "10px" }}>
              <MDBNavbarLink href="#">
                <MDBIcon fas icon="search"></MDBIcon>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBBtn href="/login" style={{backgroundColor: '#ab8461'}}>Sign In</MDBBtn>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
