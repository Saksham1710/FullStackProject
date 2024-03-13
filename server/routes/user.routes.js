import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/user.controller.js";
import { addToCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/current-user").get(verifyJWT,getCurrentUser); // Add this route for fetching current user information
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/card/add",verifyJWT).post(addToCart);

// secured routes
 router.route("/logout").post(verifyJWT,logoutUser);
// router.route("/refresh-token").post(refreshAccessToken)


export default router;
