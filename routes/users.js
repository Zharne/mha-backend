const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth-jwt");
const Post = require("../models/Post");

//GET BACK ALL USERS
router.get('/', async (req,res) => {
  try{
      const users = await User.find();
      res.json(users);
  } catch (err){
      res.status(500).json({ message:err });
  }
  
});
//ADD A USER
router.post('/', async (req,res) => {
  const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
      // created_by: req.userId,
  });
  try{
  const savedUser = await user.save();
  res.status(201).json(savedUser);
  }catch(err) {
      res.status(400).json({ message: err });
  }
}); 

//SPECIFIC USER
router.get('/:userId', async (req,res) => {
  try{
      const user = await User.findById(req.params.userId);
      res.json(user);
  } catch (err) {
      res.json({ message: err });
  }
});

//UPDATE USER
router.patch('/:userId',[getUser, verifyToken], async (req,res) => {
  if (req.params.id != req.userId) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try{
      const updatedUser = await User.updatedOne(
          { _id: req.params.userId },
          { $set: { name: req.body.name } }
      );
      res.json(updatedUser);
  } catch (err) {
      res.status(500).json({ message: err });  //res.status(400).json
  }
});   

//DELETE USER
router.delete('/:userId',[getUser, verifyToken], async (req,res) => {
  try{
  const removedUser = await User.remove({_id:req.params.userId });
  res.json(removedUser);
  } catch(err) {
      res.json({ message: err });
  }
});
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}
async function checkDuplicateName(req, res, next) {
  let user;
  try {
    user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(404).send({ message: "User already exist." });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
}
async function checkDuplicateEmail(req, res, next) {
  let email;
  try {
    email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(404).send({ message: "Email already exist." });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
}

//REGISTER
router.post("/register", [checkDuplicateName, checkDuplicateEmail], async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(newUser);
    console.log(salt);
    console.log(hashedPassword);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // const user = await User.findOne({ username: req.body.username });
    // !user && res.status(400).json("Wrong credentials!");

    // const validated = await bcrypt.compare(req.body.password, user.password);
    // !validated && res.status(400).json("Wrong credentials!");

    // const { password, ...others } = user._doc;
    // res.status(200).json(others);
    User.findOne({ name: req.body.username }, (err, person) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!person) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        person.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      let token = jwt.sign({ userId: person.userId, comments: person.comments }, process.env.ACCESSTOKEN, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        userId: person.userId,
        username: person.username,
        email: person.email,
        accessToken: token,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
