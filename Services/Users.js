const express = require("express")
const route = express.Router()
const User = require("../Models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

route.post("/login" , async (req,res)=>{
    const {EMAIL,PASSWORD,isAdmin} = req.body ; 
    const FindUser =await User.findOne({EMAIL});
    if (FindUser){
      const checkPwd =await bcrypt.compareSync(PASSWORD,FindUser.PASSWORD)
      if(checkPwd){
        const {email,isadmin} = FindUser
        const Token = await jwt.sign({email,isadmin},process.env.Jwt_SECRETKEY,{expiresIn:'24h'})
        res.header('token',Token);
        res.status(200).send({message: "Connected....",Token})
      }else{
        res.status(400).send({message:"password invalid"})
      }
    }
    else{
        res.status(401).send({message: " User  created before "} )
    }
})



route.post("/" , async (req,res)=>{
  try {
    const userData = req.body; 
    const {EMAIL} = userData
    const FindUser =await User.findOne({EMAIL});
    if (!FindUser){
        const hashpwd =await  bcrypt.hash(userData.PASSWORD,10)
        userData.PASSWORD = hashpwd
        const newUser = await User.create(userData);
        res.status(200).send({message: "User created <3 ", data: newUser} )
    }
    else{
        res.status(401).send({message: " User  created before "} )
    }
  } catch (error) {
    res.status(500).send({error:error.message})
  }
    
})


route.get("/",async (req,res)=>{
    const users = await User.find()
    users? res.status(200).send({message: " success fetching Data" , data : users})
    :res.status(404).send({message:"Aucun user "})
})




module.exports = route 