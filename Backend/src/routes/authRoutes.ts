import express from "express";
const Router = express.Router();
import * as authController from "../controllers/authController"

Router.post('/register',authController.postSignup);
Router.post('/login',authController.postLogin);

export default Router;