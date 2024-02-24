const express = require('express');
const app = express();
require("./DbConnect")
const RendezVous = require("./Services/RendezVous")
const UsersRoute = require("./Services/Users")
require("dotenv").config()
const PORT = process.env.PORT
const session = require("express-session");

const cors =require("cors")
app.use(express.static("./public"));



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(
  session({
    secret: 'IcallSecretKey',
    resave: false,
    saveUninitialized: false,
  })
);




app.use("/users", UsersRoute);


app.use("/rendez-vous",  RendezVous);



app.use((req,res)=>{
  res.status(404).send({message : "Page Not Found "})
});

app.listen(PORT || 3000 , ()=>{
    console.log("listening...Port:"+PORT);
});