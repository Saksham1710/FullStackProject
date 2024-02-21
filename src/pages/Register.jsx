import React, { useEffect } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import logo from '../assets/BrewBoxLogo.png';
import images from '../assets/ImageData';
import { Link } from 'react-router-dom';
const randomNum=Math.floor(Math.random() * images.length);


function Register() {
    useEffect(() => {
        // Disable scrolling when component mounts
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    return (
        <MDBContainer fluid>
            <MDBRow className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <MDBCol sm='6'>
                    <div className='d-flex flex-column align-items-center mb-5'>
                        <img src={logo} alt="Logo" style={{ height: '240px', marginBottom: '20px' }} />
                    </div>
                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75'>
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px', color: '#6e4b3a' }}>Register</h3>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='First Name' id='formControlLg' type='text' size="lg" />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Last Name' id='formControlLg' type='text' size="lg" />
                            </MDBCol>
                        </MDBRow>
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" />
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Confirm Password' id='formControlLg' type='password' size="lg" />
                        <div className="form-check mb-4 mx-5">
                            <input className="form-check-input" type="checkbox" value="" id="termsCheckbox" />
                            <label className="form-check-label" htmlFor="termsCheckbox">
                                I agree to the terms and conditions
                            </label>
                        </div>
                        <MDBBtn className="mb-2 px-5 mx-5 w-100" style={{ backgroundColor: '#533e2d' }} size='lg'>Register</MDBBtn>
                        <div className="mb-2 px-5 mx-5 w-100 d-flex align-items-center">
                            <hr className="flex-grow-1 mx-2" />
                            <div>Or</div>
                            <hr className="flex-grow-1 mx-2" />
                        </div>
                        <MDBBtn className="mb-4 px-5 mx-5 w-100" style={{ backgroundColor: '#ab8461' }} size='lg'>
                            <MDBIcon fab icon="google" className="me-2" />
                            Sign up with Google
                        </MDBBtn>
                        <p className='ms-5'>Already have an account? <Link to="/" className="link-info" >Log in here</Link></p>
                    </div>
                </MDBCol>
                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <div style={{ backgroundColor: '#f2e8dd', backgroundImage: `url(${images[randomNum]})`, backgroundSize: 'cover', backgroundPosition: 'left', width: '100%', height: '100vh' }}></div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;
