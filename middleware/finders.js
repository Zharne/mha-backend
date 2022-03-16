const User = require("../models/User")
const Post = require("../models/Post")


async function findUser(req,res,next){
    let user
    try {
        user = await User.findById(req.userId)
        if(!user) return res.status(404).send({message: "User not found."})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
    res.user = user
    next()
}

async function findPost(req,res,next){
    let post
    try {
        post = await Post.findById(req.params.id)
        if(!post) return res.status(404).send({message: "Post not found."})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
    res.post = post
    next()
}

module.exports = {
    findUser: findUser,
    findPost: findPost
}