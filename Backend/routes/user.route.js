import express from "express";
import { logout, register } from "../controller/user.controller.js";
import { login, getMyprofile, getAdmin } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router=express.Router();


router.post("/register",register)
router.post("/login",login);
router.get("/logout",isAuthenticated,logout)
router.get("/my-profile",isAuthenticated,getMyprofile);
router.get("/admins",getAdmin); //for seeing all admins no authorization required

export default router;