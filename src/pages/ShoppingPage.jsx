import React from "react";
import { Link } from "react-router-dom"; // Import Link
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import coffees from "../assets/Data/CoffeeData";
import teas from "../assets/Data/TeaData";
import TeaCard from "../components/TeaCard";
import bottledBeverages from "../assets/Data/Beverages";
import BottledCardComponent from "../components/BottledCardComponent";

function ShoppingPage() {
    return (
        <div>
            <Navbar />
            
            {/* Coffee Section */}
            <div style={{ textAlign: "center", color: "darkbrown" }}>
                <h2 style={{marginTop:"30px"}}>Coffee</h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    {coffees.map((coffee, index) => (
                        <Link key={index} to={`/product/${coffee.id}`}> {/* Wrap each Card with Link */}
                            <Card
                                id={coffee.id}
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
                        console.log(tea),
                        <Link key={index} to={`/product/${tea.id}`}> {/* Wrap each TeaCard with Link */}
                            <TeaCard
                                id={tea.id}
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
                        <Link key={index} to={`/product/${beverage.id}`}> {/* Wrap each Card with Link */}
                            <BottledCardComponent
                                id={beverage.id}
                                name={beverage.name}
                                description={beverage.description}
                                image={beverage.image}
                                price={beverage.price}
                                overallStars={beverage.overallStars}
                                quantity={beverage.quantity}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            
            
            <Footer />
        </div>
    );
}

export default ShoppingPage;
