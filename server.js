const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const authRoutes = require("./routes/auth");

const app = express();

mongoose.connect(
"mongodb://localhost:27017/loginDB"
);

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:"secretkey",
    resave:false,
    saveUninitialized:false
}));

app.set("view engine","ejs");

app.use(authRoutes);

app.get("/",(req,res)=>{
    res.render("register");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/dashboard",(req,res)=>{

    if(req.session.user)
    {
        res.render("dashboard",
        {user:req.session.user});
    }
    else
    {
        res.redirect("/login");
    }
});

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");
});

app.listen(3000,()=>{
    console.log("Server Running");
});
