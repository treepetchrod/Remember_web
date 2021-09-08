const router = require("express").Router();
const Posts = require("../models/Posts");

//Create Post
router.post("/create", async (req,res) => {
    try {
        const create = await new Posts({
            username:req.body.username,
            title:req.body.title,
            desc:req.body.desc,
            photo:req.body.photo,
        })
        .save()
        res.status(201).json(create);
    }catch(err){
        res.status(500).json(err);
    }
})
//Get posts
router.get("/getposts", async (req,res) => {
    try {
        const getPosts = await Posts.find().sort({createdAt:-1})
        res.status(201).json(getPosts);

    }catch(err){
        res.status(500).json(err);
    }
})

//Get myposts
router.get("/myposts/:username", async (req,res) => {
    try {
        const myPosts = await Posts.find({username:req.params.username}).sort({createdAt:-1})
        res.status(201).json(myPosts);

    }catch(err){
        res.status(500).json(err);
    }
})
//Get Single Post
router.get("/singlepost/:id", async (req,res) => {
    try {
        const singlePost = await Posts.findById(req.params.id)
        res.status(201).json(singlePost);
    }catch(err){
        res.status(500).json(err);
    }
})
//Delete post
router.delete("/delete/:id", async (req,res) => {
    try {
        await Posts.findByIdAndDelete(req.params.id)
        res.status(201).json("delete success");
    }catch(err){
        res.status(500).json(err);
    }
})

//Update post
router.put("/edit/:id", async (req,res) => {
    try {
        await Posts.findByIdAndUpdate(
            req.params.id,
            {
            title:req.body.title,
            desc:req.body.desc,
            // photo:req.body.photo
            })
        res.status(201).json("update success");
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;