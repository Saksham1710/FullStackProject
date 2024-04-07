import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; // Import Link
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import TeaCard from "../components/TeaCard";
import BottledCardComponent from "../components/BottledCardComponent";
import axios from "axios";

function ShoppingPage() {
    const [coffees, setCoffeeData] = useState([]); // Create a state variable to store the coffee data
    const [teas, setTeaData] = useState([]); // Create a state variable to store the tea data
    const [bottledBeverages, setBeveragesData] = useState([]); // Create a state variable to store the bottled beverages data

    const url="https://full-stack-project-backend.vercel.app/";
    useEffect(()=> {
            const fetchCoffee = async() =>{
           try {
             const response = await axios.get(`${url}api/v1/coffees`);
             //console.log("Data Fetched: ",response.data);
             setCoffeeData(response.data);
           } catch (error) {
            console.log("Error fetching coffee data" + error);
           }
        };
        fetchCoffee();
    },[]);
    useEffect(()=> {
            const fetchTea = async() =>{
           try {
             const response = await axios.get(`${url}api/v1/teas`);
             //console.table(response.data);
             setTeaData(response.data);
           } catch (error) {
            console.log("Error fetching coffee data" + error);
           }
        };
        fetchTea();
    },[]);
      
    useEffect(()=> {
            const fetchBeverages = async() =>{
           try {
             const response = await axios.get(`${url}api/v1/beverages`);
             //console.table("Data fetched",response.data);
             setBeveragesData(response.data);
           } catch (error) {
            console.log("Error fetching coffee data" + error);
           }
        };
        fetchBeverages();
    },[]);
   
    
    return (
        <div>
            <Navbar />
            {/* Coffee Section */}
            <div style={{ textAlign: "center", color: "darkbrown" }}>
                <h2 style={{marginTop:"30px"}}>Coffee</h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    {coffees.map((coffee, index) => (
                        <Link key={index} to={`/api/v1/coffees/${coffee._id}`}>
                            <Card
                                id={coffee._id}
                                title={coffee.title}
                                description={coffee.description}
                                imageUrl={coffee.image}
                                price={coffee.pricePer10lb}
                                rating={coffee.overallStars}
                                roastType={coffee.roastType}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            
            {/* Tea Section */}
            <div style={{ textAlign: "center", color: "darkbrown" }}>
                <h2 style={{marginTop:"30px"}}>Tea</h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    {teas.map((tea, index) => (
                        //console.log(tea),
                        <Link key={index} to={`/api/v1/teas/${tea._id}`}> {/* Wrap each TeaCard with Link */}
                            <TeaCard
                                id={tea._id}
                                title={tea.title}
                                description={tea.description}
                                imageUrl={tea.image}
                                price={tea.pricePer10lb}
                                rating={tea.overallStars}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            {/* Bottled Beverages Section */}
            <div style={{ textAlign: "center", color: "darkbrown" }}>
                <h2 style={{marginTop:"30px"}}>Bottled Beverages</h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    {bottledBeverages.map((beverage, index) => (
                        <a key={index} href={`/api/v1/beverages/${beverage._id}`}> {/* Wrap each Card with Link */}
                            <BottledCardComponent
                                id={beverage._id}
                                name={beverage.name}
                                description={beverage.description}
                                image={beverage.image}
                                price={beverage.price}
                                overallStars={beverage.overallStars}
                                quantity={beverage.quantity}
                            />
                        </a>
                    ))}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default ShoppingPage;
