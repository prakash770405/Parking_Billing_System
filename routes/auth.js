const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.get("/register",(req,res)=>{

    res.render("register");
});

router.post("/register",async(req,res)=>{

    const {name,email,password,role} = req.body;

    const hash = await bcrypt.hash(password,10);

    await User.create({
        name,
        email,
        password:hash,
        role
    });

    res.redirect("/login");
});

router.get("/login",(req,res)=>{

    res.render("login");
});

router.post("/login",async(req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.send("User not found");
    }

    const match = await bcrypt.compare(
        password,
        user.password
    );

    if(!match){
        return res.send("Wrong Password");
    }

    const token = jwt.sign({
        id:user._id,
        role:user.role,
        name:user.name
    },
    process.env.JWT_SECRET);

    res.cookie("token",token);

    if(user.role==="admin"){
        return res.redirect("/admin");
    }

    res.redirect("/assistant");
});

router.get("/logout",(req,res)=>{

    res.clearCookie("token");

    res.redirect("/login");
});

module.exports = router;