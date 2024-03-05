import React from 'react';
import '../styles/AboutUs.css';
import OurMission from '../assets/Images/OurMission.jpg';
import Experience from '../assets/Images/Experience.jpg';
import OurValues from '../assets/Images/OurValues.jpg';
import KeyFeatures from '../assets/Images/KeyFeatures.jpg';
import AboutUS from '../assets/Images/AboutUS.jpg';
import AboutUsHome from '../components/AboutUsHome';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { AboutUsHomeList } from '../components/AboutUsHome';

const AboutUs = () => {
    const aboutSections = [
        {
            title: "About Us",
            content: "At Brew Box Co., we're passionate about delivering exceptional coffee experiences to our customers. Our journey began with a simple vision: to share our love for quality coffee with the world. Since our inception, we've been committed to sourcing the finest beans, roasting them to perfection, and delivering them fresh to your doorstep.",
            image: AboutUS
        },
        {
            title: "Our Mission",
            content: "Our mission is to enrich your daily ritual with the perfect cup of coffee. We believe that every sip should be an indulgence, a moment of pure pleasure and satisfaction. From the first pour to the last drop, we're dedicated to ensuring that every batch is crafted with care and precision, so you can savor the rich flavors and aromas of our coffee blends.",
            image: OurMission
        },
        {
            title: "Experience at Brew Box Co.",
            content: "Ready to elevate your coffee experience? Join us on a journey of discovery and delight. Explore our collection of artisanal blends, indulge in the finest flavors, and awaken your senses with every sip. Start your coffee adventure today!",
            image: Experience
        }
    ];

    const aboutData = [
        {
          title: "Our Values",
          content: [
            "Quality: We uphold the highest standards of quality throughout every step of our coffee-making process, from bean selection to brewing.",
            "Sustainability: We are committed to sustainability and ethical sourcing practices, ensuring that our coffee is not only delicious but also responsibly produced.",
            "Innovation: We continuously strive to innovate and improve, exploring new flavors, techniques, and brewing methods to enhance your coffee experience."
          ]
        },
        {
          title: "Key Features and Benefits",
          content: [
            "Premium Beans: We source our beans from renowned coffee-growing regions around the world, ensuring unparalleled quality and freshness.",
            "Artisanal Roasting: Our master roasters skillfully roast each batch to unlock the unique flavors and nuances of the beans, resulting in rich, complex profiles.",
            "Customizable Subscriptions: With our flexible subscription plans, you can customize your coffee delivery frequency and explore new blends tailored to your taste preferences."
          ]
        }
      ];
      

    return (
        <div className="about-us-container">
        <NavBar/>
           
            <AboutUsHome
                image={aboutSections[0].image}
                title={aboutSections[0].title}
                content={aboutSections[0].content}
                showButton={false}
                alignImageRight={false}
            />
         
            <AboutUsHomeList
                image={OurValues}
                title={aboutData[0].title}
                description="Our values are at the core of everything we do. They guide our decisions, inspire our actions, and drive our commitment to excellence."
                list={aboutData[0].content}
                showButton={false}
                alignImageRight={true}
            />


            <AboutUsHome
                image={aboutSections[1].image}
                title={aboutSections[1].title}
                content={aboutSections[1].content}
                showButton={false}
                alignImageRight={false}  
            />

            <AboutUsHomeList
                image={KeyFeatures}
                title={aboutData[1].title}
                description="Discover the key features and benefits of Brew Box Co.'s premium coffee subscription service."
                list={aboutData[1].content}
                showButton={false}
                alignImageRight={true}
            />

            <AboutUsHome
                image={aboutSections[2].image}
                title={aboutSections[2].title}
                content={aboutSections[2].content}
                showButton={false}
                alignImageRight={false}
            />

            <Footer/>
        </div>
    );
};

export default AboutUs;
