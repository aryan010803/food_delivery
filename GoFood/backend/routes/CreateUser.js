const express = require('express');
const router  = express.Router();
const User  = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt  = require('bcrypt');
const jwt  = require('jsonwebtoken');
const jwtseceret = "gdsjfsdkavfdfkuhvgdshuvguadgcdsugvj"
router.post('/createuser' , 
[body('email').isEmail(),
body('password').isLength({min:5}),
body('name').isLength({min:5})],

async(req,res)=>{   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }   
    let salt = await bcrypt.genSalt(10);
    let  secpass = await bcrypt.hash(req.body.password , salt);
    try{
        await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:secpass,
        })
        res.json({success:true});

    }catch(err){
        console.log(err);
        res.json({success:false});
    }


})

router.post('/loginuser' ,[body('email').isEmail() , body('password').isLength({min:5})], async(req,res)=>{
    let email  = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }   
    try{
       let udata =  await User.findOne({email});
       if(!udata){
        return res.status(400).json({errors:"Try correct credentials"});
       }
       const pwdcomp  = await bcrypt.compare( req.body.password , udata.password)
       if(!pwdcomp){
        return res.status(400).json({errors:"Try correct credential"});
       }
       const data ={
        user:{
            id:udata.id
        }
       }
       const authToken = jwt.sign(data ,jwtseceret )
       return res.json({success:true , authToken:authToken} );

    }catch(err){
        console.log(err);
        res.json({success:false});
    }


})
module.exports = router;