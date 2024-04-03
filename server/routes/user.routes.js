import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser, getAddress, addAddress } from "../controllers/user.controller.js";
import { addCoffeeToCart, addTeaToCart, addBeverageToCart, getCartItems, updateCartQty, removeFromCart } from "../controllers/cart.controller.js";
import {createPaymentSession} from '../utils/Payment.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/current-user").get(verifyJWT,getCurrentUser); // Add this route for fetching current user information
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/coffee/cart/add",verifyJWT).post(addCoffeeToCart);
router.route("/tea/cart/add",verifyJWT).post(addTeaToCart);
router.route("/beverage/cart/add",verifyJWT).post(addBeverageToCart);
router.route("/cart").get(verifyJWT,getCartItems);
router.route("/cart/updateQty/:itemId/:quantity").post(verifyJWT,updateCartQty);
router.route("/cart/remove/:itemId").delete(verifyJWT,removeFromCart);
router.route("/get-address").get(verifyJWT,getAddress);
router.route("/add-address").post(verifyJWT,addAddress);
router.post("/payment", async (req, res) => {
    try {
      const { items } = req.body;
      console.log(
        "Items in payment route:",
        items
      );
       const session = await createPaymentSession(items);
       console.log("Session:", session.url);
       res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// secured routes
// router.route("/refresh-token").post(refreshAccessToken)


export default router;
    

//localhost:4000/api/v1/users/cart