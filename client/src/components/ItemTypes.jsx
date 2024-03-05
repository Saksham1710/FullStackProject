import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import tea from "../assets/Images/tea.jpg";
import coffee from "../assets/Images/Coffee.jpg";
import bottledBeverages from '../assets/Images/bottledbeverages.jpg';

export default function ItemTypes() {
  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h1 className="mb-4">Range of Choices</h1>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
          "Indulge in our exquisite Range of Choices, curated to elevate every moment with sophistication and taste."
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center">
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src={coffee}
              className="rounded-circle shadow-1-strong"
              width="250"
              height="250"
            />
          </div>
          <h3 className="mb-3">Coffee</h3>
          <h6 className="text-primary mb-3"></h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            "Savor the finest coffee blends from exotic corners of the world. Whether you crave bold richness or smooth subtlety, our selection caters to all tastes, ensuring a perfect start to your day."
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon
                fas
                icon="star-half-alt"
                size="sm"
                className="text-warning"
              />
            </li>
          </MDBTypography>
        </MDBCol>
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src={tea}
              className="rounded-circle shadow-1-strong"
              width="250"
              height="250"
            />
          </div>
          <h3 className="mb-3">Tea</h3>
          <h6 className="text-primary mb-3"></h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            "Experience tranquility with our handcrafted tea blends. From soothing herbal infusions to invigorating green teas, each sip promises an escape into blissful relaxation."
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
          </MDBTypography>
        </MDBCol>
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src={bottledBeverages}
              className="rounded-circle shadow-1-strong"
              width="250"
              height="250"
            />
          </div>
          <h3 className="mb-3">Bottled Beverages</h3>
          <h6 className="text-primary mb-3"></h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            "Experience tranquility with our handcrafted tea blends. From soothing herbal infusions to invigorating green teas, each sip promises an escape into blissful relaxation."
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon far icon="star" size="sm" className="text-warning" />
            </li>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}