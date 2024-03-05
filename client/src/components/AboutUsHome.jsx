import React from 'react';
import '../styles/AboutUs.css';

const AboutUsHome = ({ image, title, content, showButton, alignImageRight }) => {
    const imageMargin = alignImageRight ? "81px 218px 47px -156px" : "81px -156px 47px 218px";

    return (
        <div className="about-us-container" style={{ display: "flex", alignItems: "center", flexDirection: alignImageRight ? "row-reverse" : "row" }}>
            <div className="about-us-image" style={{ flex: 1 }}>
                <img style={{ margin: imageMargin, borderRadius: "60%", width: "340px", height:"320px" }} src={image} alt={title} />
            </div>
            <div className="about-us-content" style={{ flex: 2, padding: "150px 290px" }}>
                <h2 style={{  marginBottom: "16px" }}>{title}</h2>
                <p style={{ fontSize: "16px", lineHeight: "1.5", textAlign: "justify" }}>{content}</p>
                {showButton && (
                    <button onClick={() => window.location.href = '/about-us'} style={{ padding: "8px 16px", fontSize: "16px", backgroundColor: "#533e2d", color: "#fff", borderRadius: "4px",border:'none', cursor: "pointer", margin: "20px auto" }}>Learn More</button>
                )}
            </div>
        </div>
    );
};

const AboutUsHomeList = ({ image, title, description, list, showButton, alignImageRight }) => {
    const imageMargin = alignImageRight ? "81px 218px 47px -156px" : "81px -156px 47px 218px";

    return (
        <div className="about-us-container" style={{ display: "flex", alignItems: "center", flexDirection: alignImageRight ? "row-reverse" : "row" }}>
            <div className="about-us-image" style={{ flex: 1 }}>
                <img style={{ margin: imageMargin, borderRadius: "60%", width: "340px", height:"320px" }} src={image} alt={title} />
            </div>
            <div className="about-us-content" style={{ flex: 2, padding: "150px 290px" }}>
                <h2 style={{ marginBottom: "16px" }}>{title}</h2>
                <p style={{ fontSize: "16px", lineHeight: "1.5", textAlign: "justify" }}>{description}</p>
                {list && (
                    <div>
                        <h3 style={{  marginBottom: "16px" }}>Key Points:</h3>
                        <ul style={{ fontSize: "16px", lineHeight: "1.5", textAlign: "justify" }}>
                            {list.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {showButton && (
                    <button onClick={() => window.location.href = 'https://www.example.com/about-us'} style={{ padding: "8px 16px", fontSize: "16px", backgroundColor: "#533e2d", color: "#fff", borderRadius: "4px", cursor: "pointer", display: "block", margin: "20px auto" }}>Learn More</button>
                )}
            </div>
        </div>
    );
};
export default AboutUsHome;
export { AboutUsHomeList };
