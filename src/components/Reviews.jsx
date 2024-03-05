import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBContainer
      fluid
      className="py-5"
      style={{ backgroundColor: "#f3f2f2", color: "#000", width: "95%", background:"white" }}
    >
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h1 className="fw-bold mb-4">What Our Customers Say</h1>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
          Discover what our valued customers have to say about their experiences with us. Read their honest reviews and testimonials to gain insights into the quality of our products and the level of satisfaction they've enjoyed. Your feedback fuels our commitment to excellence and helps us continuously improve to serve you better
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center">
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard style={{background:"white", boxShadow:"none"}}>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                  className="rounded-circle shadow-1-strong"
                  width="150"
                  height="150"
                />
              </div>
              <h5 className="font-weight-bold">Teresa May</h5>
              <h6 className="font-weight-bold my-3">Founder at ET Company</h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star-half-alt" size="sm" color="info" />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                Absolutely love the coffee from this place! The aroma alone is enough to brighten my mornings. The flavors are rich and complex, and each sip feels like a treat. Couldn't ask for a better start to my day!
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard style={{background:"white", boxShadow:"none"}}>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                  className="rounded-circle shadow-1-strong"
                  width="150"
                  height="150"
                />
              </div>
              <h5 className="font-weight-bold">Maggie McLoan</h5>
              <h6 className="font-weight-bold my-3">
                Photographer at Studio LA
              </h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                The tea collection here is simply outstanding. I've tried several blends, and each one has been a delightful experience. The flavors are well-balanced, and the quality is top-notch. Definitely my go-to for a calming cup of tea.
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard style={{background:"white", boxShadow:"none"}}>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp"
                  className="rounded-circle shadow-1-strong"
                  width="150"
                  height="150"
                />
              </div>
              <h5 className="font-weight-bold">Alexa Horwitz</h5>
              <h6 className="font-weight-bold my-3">
                Front-end Developer in NY
              </h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon far icon="star" size="sm" color="info" />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                I'm hooked on their bottled beverages! The variety is fantastic, and every drink is so refreshing. Whether I'm craving something fruity or a classic soda, they've got it all. Plus, the convenience of having it bottled makes it perfect for on-the-go. Highly recommend!
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}