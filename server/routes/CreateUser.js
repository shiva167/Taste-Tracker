const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret="jdhfjshuheuhjsdhurhewhfudiwhfuhwaiuhuiwaewfjksdjfwe";
router.post('/creatuser',[body('email',"not a valid email").isEmail(),body('name','not a valid name').isLength({min:5}),body('password','password must min 5 character').isLength({min:5})],async(req,res)=>{

  const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt= await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try{
       await User.create({
        name:req.body.name,
        password:secPassword,
        email:req.body.email,
        location:req.body.location
    })
    res.json({success:true})
    }catch(err){
    console.log(err)
      res.json({success:false})
    }
})
///login user
router.post('/loginuser',[body('email',"not a valid email").isEmail(),body('password','Incorrect password').isLength({min:5})],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let email = req.body.email;
    try{
      let userData=  await User.findOne({email});
      if(!userData){
        return res.status(400).json({errors:"Try logging with correct credentials"});
      }
      const pwdCompare= await bcrypt.compare(req.body.password,userData.password);
      if(!pwdCompare){
        return res.status(400).json({errors:"Try logging with correct credentials"});  
      }
      const data={
        user:{
        id:userData.id
      }
    }
    const authToken = jwt.sign(data,jwtSecret)
      return res.json({success:true,authToken:authToken})
    res.json({success:true})
    }catch(err){
    console.log(err)
      res.json({success:false})
    }
})
module.exports=router;