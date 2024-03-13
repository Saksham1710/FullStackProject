import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LandingPage from "../components/LandingPage";
import AboutUsHome from "../components/AboutUsHome";
import Card from "../components/Card";
import coffees from "../assets/Data/CoffeeData";
import Reviews from "../components/Reviews";
import AboutUS from "../assets/Images/AboutUS.jpg";
import ItemTypes from "../components/ItemTypes";
import ReviewInput from "../components/ReviewInput";
import '../styles/style.css';



function HomePage() {
  // React.useEffect(() => {
  //   const fetchUserLoginStatus = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/api/v1/users/current-user', {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('User login status:', data);
  //         // Assuming you have a function setUser or similar to set user state
  //         // setUser(data.user);
  //       } else if (response.status === 401) {
  //         // Handle unauthorized access, maybe redirect to login page
  //         console.log('Unauthorized access');
  //       } else {
  //         // Handle other error cases
  //         console.error('Error fetching user login status:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user login status:', error);
  //     }
  //   };
  
  //   fetchUserLoginStatus();
  // }, []);
  

    const getRandomNumbers = () => {
        const numbers = [];
        while (numbers.length < 3) {
            const randomNum = Math.floor(Math.random() * coffees.length);
            if (!numbers.includes(randomNum)) {
                numbers.push(randomNum);
            }
        }
        return numbers;
    };

    const randomNumbers = getRandomNumbers();

    return (
        <div>
            <Navbar />
            <LandingPage />
            <AboutUsHome
                image={AboutUS}
                title="About Us"
                content="At Brew Box Co., we're passionate about delivering exceptional coffee experiences to our customers. Our journey began with a simple vision: to share our love for quality coffee with the world. Since our inception, we've been committed to sourcing the finest beans, roasting them to perfection, and delivering them fresh to your doorstep."
                buttonText="Learn More"
                buttonLink="https://www.example.com/about-us"
                showButton={true}
            />
            <ItemTypes />


    <div>
    <h2 style={{textAlign:'center'}}>Our Products</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
        {randomNumbers.map((randomNum) => (
          <Card
            key={coffees[randomNum].id} // Ensure each Card has a unique key prop
            id={coffees[randomNum].id}
            title={coffees[randomNum].title}
            description={coffees[randomNum].description}
            imageUrl={coffees[randomNum].image}
            price={coffees[randomNum].pricePer10lb}
            rating={coffees[randomNum].overallStars}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "0" }}>
        <a href="/shopping" style={{color:'#533E2D',textDecoration:'underline',fontSize:'20px'}}>View All</a>
      </div>
    </div>
            <Reviews />
            <ReviewInput />
            <Footer />
        </div>
    );
}

export default HomePage;
