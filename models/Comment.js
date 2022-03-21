const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
created_by: {
    type: String,
    required: true,
},
comment: {
    type: String,
    required: true,
},
});

//GET BACK ALL COMMENTS
router.get('/', async (req,res) => {
    try{
        const comment = await Comment.find();
        res.json(comment);
    } catch (err){
        res.status(500).json({ message:err });
    }
    
});

//SUBMITS A COMMENT
router.post('/', async (req,res) => {
    const comment = new Comment({
        // title: req.body.title,
        // description: req.body.description,
        created_by: req.body.userId,
        comment: req.body.comment
    });
    try{
    const savedComment = await comment.save();
    res.status(201).json(savedPost);
    }catch(err) {
        res.status(400).json({ message: err });
    }

});
//SPECIFIC COMMENT
router.get('/:commentId', async (req,res) => {
    try{
        const comment = await Comment.findById(req.params.userId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A COMMENT
router.patch('/:commentId', async (req,res) => {   //should it be userID/commentID
    try{
        const updatedComment = await Comment.updatedOne(
            { _id: req.params.commentId },
            { $set: { comment: req.body.comment } }
        );
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err });  //res.status(400).json
    }
});   

//DELETE COMMENT
router.delete('/:commentId', async (req,res) => {
    try{
    const removedComment = await Comment.remove({_id:req.params.commentId });
    res.json(removedComment);
    } catch(err) {
        res.json({ message: err });
    }
});
async function getComment(req, res, next) {
    let comment;
    try {
      comment = await comment.findById(req.params.id);
      if (comment == null) {
        return res.status(404).json({ message: "There are no comments" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.comment = comment;
    next();
  }
  


module.exports = mongoose.model("comment", commentSchema);
