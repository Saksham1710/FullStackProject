import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51Owu1S2KtvJNErGvvfe6YtkvWJABFklWBQI5r0PLQBhNWzLGNpO5uOWy0KwZkTz1unQ1kYK5qKo7IvxmzmXCwnGY007ELOsKYY");

async function createPaymentSession(items) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map(item => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: item.title,
            images: [item.image], // Assuming item.image contains the URL of the image
          },
          unit_amount: Math.round(item.pricePerPiece * 100), // Convert price to cents
        },
        quantity: item.quantity,
      })),
      // Enable automatic tax calculation
      automatic_tax: { enabled: true },
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/api/v1/users/cart/finalPage`,
    });
    return session;
  } catch (error) {
    throw new Error(`Error creating payment session: ${error.message}`);
  }
}

export { createPaymentSession };
