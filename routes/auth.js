const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {

    const hashedPassword =
    await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });

    await user.save();

    res.redirect("/login");
});

router.post("/login", async (req, res) => {

    const user =
    await User.findOne({
        username: req.body.username
    });

    if(user &&
       await bcrypt.compare(
       req.body.password,
       user.password))
    {
        req.session.user = user.username;
        res.redirect("/dashboard");
    }
    else
    {
        res.send("Invalid Login");
    }
});

module.exports = router;
