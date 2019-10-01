const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const cors = require('cors')
const sqllite = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./Smart-Brain.sqlite"
  }
});

const app = express();
const register = require("./contollers/register")
const signin = require("./contollers/signin")
const profile = require("./contollers/profile")
const image = require("./contollers/image")

const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(cors());

app.post("/signin",(req,res) => {signin.handleSignin(req,res,sqllite,bcrypt)})
app.post("/register",(req,res) => {register.handleRegister(req,res,sqllite,bcrypt)})	
app.get("/profile/:id",(req,res) => {profile.handleProfileGet(req,res,sqllite)})
app.put("/image",(req,res) => {image.handleImagePut(req,res,sqllite)})
app.post("/imageurl",(req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,(req,res)=>{
		console.log("listening on port" + PORT)
});



  