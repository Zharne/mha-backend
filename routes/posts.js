const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

//GET BACK ALL POSTS
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (err){
        res.status(500).json({ message:err });
    }
    
});

//SUBMITS A POST
router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        catergory: req.body.catergory
        // created_by: req.userId,
    });
    try{
    const savedPost = await post.save();
    res.status(201).json(savedPost);
    }catch(err) {
        res.status(400).json({ message: err });
    }

});
//SPECIFIC POST
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A POST
router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Post.updatedOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err });  //res.status(400).json
    }
});   

//DELETE POST
router.delete('/:postId', async (req,res) => {
    try{
    const removedPost = await Post.remove({_id:req.params.postId });
    res.json(removedPost);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;