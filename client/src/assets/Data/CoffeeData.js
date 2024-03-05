const coffees = [
    {
        id: 1,
        title: 'Ethiopian Yirgacheffe',
        description: 'Known for its fruity and floral notes, with a bright acidity and medium body.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573894/Coffee/z93wddhuwbdw3mqgjnlz.png",
        pricePer10lb: 49.99,
        overallStars: 4.7,
        roastType: 'Light Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 95, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 2,
        title: 'Colombian Supremo',
        description: 'Smooth and well-balanced, with a nutty flavor and a hint of cocoa.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573894/Coffee/wu5muph2i2ybwo1yz7jj.jpg",
        pricePer10lb: 52.99,
        overallStars: 4.6,
        roastType: 'Medium Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 90, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 3,
        title: 'Guatemalan Antigua',
        description: 'Rich and complex, with a chocolatey sweetness and a hint of spice.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573894/Coffee/wnpvs55z50kjmownpwfp.jpg",
        pricePer10lb: 54.99,
        overallStars: 4.8,
        roastType: 'Dark Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 100, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 4,
        title: 'Costa Rican Tarrazú',
        description: 'Clean and bright, with a citrus acidity and a caramel sweetness.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573894/Coffee/onwhmmatqbdofsob5ikr.jpg",
        pricePer10lb: 56.99,
        overallStars: 4.5,
        roastType: 'Medium Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 85, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 5,
        title: 'Kenyan AA',
        description: 'Bold and fruity, with a wine-like acidity and a full-bodied flavor.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573895/Coffee/uqeqkze9mzuussofl3vs.jpg",
        pricePer10lb: 58.99,
        overallStars: 4.6,
        roastType: 'Medium-Dark Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 110, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 6,
        title: 'Brazilian Santos',
        description: 'Smooth and mild, with a nutty flavor and a subtle sweetness.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573894/Coffee/ch4bd53ufvfmav3qqovr.png",
        pricePer10lb: 47.99,
        overallStars: 4.4,
        roastType: 'Medium Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 80, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 7,
        title: 'Sumatran Mandheling',
        description: 'Earthy and full-bodied, with a lingering herbal spice and a rich aroma.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573895/Coffee/iz2l6mct8diqpq93tixn.jpg",
        pricePer10lb: 51.99,
        overallStars: 4.5,
        roastType: 'Dark Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 100, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 8,
        title: 'Jamaican Blue Mountain',
        description: 'Exceptionally smooth and balanced, with a mild flavor and a clean finish.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573895/Coffee/hodt1kmrgi53svs7deqf.jpg",
        pricePer10lb: 99.99,
        overallStars: 4.9,
        roastType: 'Medium Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 80, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 9,
        title: 'Hawaiian Kona',
        description: 'Delicate and aromatic, with a bright acidity and a hint of nuttiness.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573894/Coffee/zppbxfh4kgagvyqqd3vy.jpg",
        pricePer10lb: 89.99,
        overallStars: 4.7,
        roastType: 'Light Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 90, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    },
    {
        id: 10,
        title: 'Mexican Altura',
        description: 'Light and crisp, with a citrusy acidity and a clean finish.',
        image: "https://res.cloudinary.com/dhc2kzi1o/image/upload/v1709573895/Coffee/vnzgqwmpn9b6xoad2kra.jpg",
        pricePer10lb: 53.99,
        overallStars: 4.4,
        roastType: 'Medium Roast',
        nutritionalValues: {
            calories: 5,
            protein: 0.3,
            fat: 0.2,
            carbohydrates: 0.6,
            fiber: 0.1,
            sugars: 0.0,
            sodium: 1,
            cholesterol: 0,
            caffeine: 100, // in mg per serving
            vitamins: {
                vitaminA: 0,
                vitaminC: 0,
                calcium: 1,
                iron: 0.1
            }
        }
    }
    // Add more coffee objects here
];

export default coffees;
