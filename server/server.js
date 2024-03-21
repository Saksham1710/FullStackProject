import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import Stripe from "stripe";

dotenv.config({
    path: "./.env"
});
connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
}));

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ])
  
  app.post("api/v1/checkout", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.CLIENT_URL}/success.html`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});
