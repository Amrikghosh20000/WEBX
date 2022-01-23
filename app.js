const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.set("view engine","ejs");
app.use(express.static('Public'))
app.use('/image',express.static(__dirname + 'Public/image'))
app.use(express.urlencoded({extended: true}))

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/WebXPRoject")


const WEBXSchema =new mongoose.Schema({
  Name:String  
});

const registerschema=new mongoose.Schema({
  email:String,
  password:Number
});

const user=mongoose.model("NEWWEBX",registerschema)

const item=mongoose.model("WEBX",WEBXSchema);

app.get("/",function(req,res){
  res.render("home")
});

app.get("/search",function(req,res){
    res.render("hello")
});

app.post("/register",function(req,res){
  const newuser=new user({
    email: req.body.username,
    password: req.body.password,
  });
  newuser.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.render("hello")
    }
  });
});

app.get("/register",function(req,res){
  res.render("register")
});

app.post("/login",function(req,res){
  const username=req.body.username;
  const password=req.body.password;
  user.findOne({email:username},function(err,founduser){
    if(err){
      console.log(err);
    }
    else{
      if(founduser){
         if(founduser.password == password){
           res.render("hello");
          }
          else{
              res.render("register");
          }
       }
    }
  });  
})

app.get("/login",function(req,res){
  res.render("login")
});

app.post("/search",function(req,res){
  const itemname=req.body.title;
  const todo4=new item({
    Name:itemname
  });
  todo4.save();
  res.redirect("/")
})



app.listen("4000",function(){
 console.log("Server is started at port number 4000");
})