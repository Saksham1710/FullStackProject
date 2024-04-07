import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import logo from '../assets/Images/BrewBoxLogo.png';
import images from '../assets/Data/ImageData';
import { Link, useNavigate } from 'react-router-dom';
const randomNum=Math.floor(Math.random() * images.length);


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsChecked: false
    });

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({ ...formData, [name]: name === 'termsChecked' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add validation checks here before sending the request

            const response = await fetch('https://full-stack-project-backend.vercel.app/api/v1/users/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            // Redirect to home page upon successful registration
            navigate('/');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsChecked: false
            })
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };

    return (
        <MDBContainer fluid>
        <form onSubmit={handleSubmit}>
            <MDBRow className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <MDBCol sm='6'>
                    <div className='d-flex flex-column align-items-center mb-5'>
                        <img src={logo} alt="Logo" style={{ height: '240px', marginBottom: '20px' }} />
                    </div>
                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75'>
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px', color: '#6e4b3a' }}>Register</h3>
                        <MDBRow>
                            <MDBCol>
                            <MDBInput
                                        wrapperClass='mb-4 mx-5 w-100'
                                        label='First Name'
                                        id='firstName'
                                        type='text'
                                        size="lg"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                            </MDBCol>
                            <MDBCol>
                            <MDBInput
                                        wrapperClass='mb-4 mx-5 w-100'
                                        label='Last Name'
                                        id='lastName'
                                        type='text'
                                        size="lg"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                            </MDBCol>
                        </MDBRow>
                        <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Email address'
                                id='email'
                                type='email'
                                size="lg"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                         <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Password'
                                id='password'
                                type='password'
                                size="lg"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Confirm Password'
                                id='confirmPassword'
                                type='password'
                                size="lg"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        <div className="form-check mb-4 mx-5">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="termsChecked"
                                    name="termsChecked"
                                    checked={formData.termsChecked}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="termsChecked">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        <MDBBtn type="submit" className="mb-2 px-5 mx-5 w-100" style={{ backgroundColor: '#533e2d' }} size='lg'>Register</MDBBtn>
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
            </form>
        </MDBContainer>
    );
}

export default Register;
