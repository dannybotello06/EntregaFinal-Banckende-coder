import { Router } from "express";
import { passportCall, authorization } from '../utils.js';




const userViewRouter = Router();



userViewRouter.get("/",
    passportCall('jwt'),
    (req, res) => {
        res.render("profile", {
            user: req.user
        });
    });


    userViewRouter.get("/login", (req, res) => {
    res.render("login");
});

userViewRouter.get("/register", (req, res) => {
    res.render("register");
});



export default userViewRouter