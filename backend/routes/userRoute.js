const express = require('express')
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


const { registerUser, loginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser); 
router.route("/password/forgot").post(forgotPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"),getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"),getSingleUser).put(isAuthenticatedUser, authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser, authorizeRoles("admin"),deleteUser);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;
