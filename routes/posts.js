const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verifyToken = require("../middleware/auth-jwt");
// const getPost = require("../middleware/finder");

let posts = [
    { 
    "title": "Mental Health",
    "description": "“Mental health is a state of well-being in which an individual realizes his or her own abilities, can cope with the normal stresses of life, can work productively, and is able to make a contribution to his or her community.”",
    "catergory": "",
    "img": "https://imgkub.com/images/2022/03/22/mental-health-gf3b036b3e_1920.jpg"
    },

    { 
    "title": "Depression",
    "description": "Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, the way you think and how you act.",
    "catergory": "",
    "img": "https://imgkub.com/images/2022/03/22/sadness-ge594f7b32_1920.jpg"
    },

    { 
    "title": "Stress",
    "description": "Stress is a normal response to situational pressures or demands, especially if they are perceived as threatening or dangerous. Stress is the result of brain chemicals, called hormones, surging through the body.",
    "catergory": "",
    "img": "https://imgkub.com/images/2022/03/22/people-g795015266_1920.jpg"
    },

    { 
    "title": "Drug abuse",
    "description": "Drug abuse and addiction, now both grouped as substance or drug use disorder, is a condition characterized by a self-destructive pattern of using a substance that leads to significant problems and distress, which may include tolerance to or withdrawal from the substance.",
    "catergory": "",
    "img": "https://imgkub.com/images/2022/03/22/tablets-g243c0ff75_1920.jpg"
    },

    { 
    "title": "Suicide",
    "description": "Suicide is death caused by injuring oneself with the intent to die.",
    "catergory": "",
    "img": "https://imgkub.com/images/2022/03/22/falling-ge0396a95f_1920.jpg"
    },  

]

getPost = async (req, res, next) => {
    let singlePost;
    try {
      singlePost = await Post.findById(req.params.userId);
      if (singlePost == null) {
        return res.status(404).json({ message: "cannot find post" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.post = singlePost;
    next();
  };

//GET BACK ALL POSTS
router.get('/', async (req,res) => {
  console.log("Going to try to get all posts")
    try{
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (err){
        res.status(500).json({ message:err });
    }
    
});

//SUBMITS A POST
router.post('/',verifyToken, async (req,res) => {
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
router.get('/:postId', getPost, async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A POST
router.patch('/:postId', [getPost, verifyToken], async (req,res) => {
    if (res.post.created_by != req.userId) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      if (req.body.username != null) {
        res.product.username = req.body.username;
      }
      if (req.body.description != null) {
        res.post.description = req.body.description;
      }
      if (req.body.catergory != null) {
        res.post.catergory = req.body.catergory;
      }
    try{
        const updatedPost = await Post.save(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err });  //res.status(400).json
    }
});   

//DELETE POST
router.delete('/:postId',[getPost, verifyToken], async (req,res) => {
    try{
        if (res.post.created_by != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
          }
          await res.post.remove();
          res.json({ message: "Deleted post" });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    // const removedPost = await Post.remove({_id:req.params.postId });
    // res.json(removedPost);
    // } catch(err) {
    //     res.json({ message: err });
    // }
});
async function getPost(req, res, next) {
    let post;
    try {
      post = await Post.findById(req.params.id);
      if (post == null) {
        return res.status(404).json({ message: "Cannot find product" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.post = post;
    next();
  }
  
module.exports = router;