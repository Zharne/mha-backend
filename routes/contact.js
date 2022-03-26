const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');

// router.get('/', (req,res) => {
//     res.send('This is the contact Page')
// })

router.post('/', async (req,res) => {
    const {name,email,message} = req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
      });
      
      let mailOptions = {
        from: 'zharnedesember@gmail.com',
        to: 'zharnedesember@gmail.com',
        subject: `${name} wants to contact you`,
        text: `${message} contact them at ${email}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(400).send({ message: "Email could not be sent." });
        } else {
          console.log('Email sent: ' + info.response);
        } 
        try {
            res.json({ message: `Thank you ${name}, your message was sent` })
            } catch (err) {
            res.status(500).json({ message: err.message })
            }
      });
})

module.exports = router