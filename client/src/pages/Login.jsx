import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Link } from 'react-router-dom';

const randomNum=Math.floor(Math.random() * images.length);

function Login() {
    const navigate = useNavigate();
    //const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/v1/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            //setUser(data.user);
            //localStorage.setItem("token", data.token);
            //navigate to the home page after successful login
            navigate('/');
        } catch (error) {
            setError(error.message);
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
                    {error && <div className="alert alert-danger">{error}</div>}
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px', color: '#6e4b3a' }}>Log in</h3>
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
                            <MDBBtn type="submit" className="mb-4 px-5 mx-5 w-100" style={{ backgroundColor: '#533e2d' }} size='lg'>Login</MDBBtn>
                        <MDBBtn className="mb-4 px-5 mx-5 w-100" style={{ backgroundColor: '#ab8461' }} size='lg'>
                            <MDBIcon fab icon="google" className="me-2" />
                            Sign in with Google
                        </MDBBtn>
                        <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                        <p className='ms-5'>Don't have an account? <Link to="/register" className="link-info" >Register here</Link></p>
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

export default Login;
