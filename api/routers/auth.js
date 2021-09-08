const router = require("express").Router();
const User = require("../models/User");

//Register

router.post("/register", async (req,res) => {
    try {
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        .save();
        res.status(201).json(user)
    } catch(err) {
        res.status(500).json(err)
    }

})

//Login

router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({username:req.body.username})
        !user && res.status(500).json("Invalid username!!!")

        if (user.password !== req.body.password) {
            res.status(500).json("Invalid password!!!")
        }
        res.status(200).json(user)
            
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;