
const express=require('express');
require('./db/config');
const cors=require('cors');
const User=require('./db/user');
const Product = require('./db/Product');

const app=express();
app.use(cors());
app.use(express.json());

app.post("/register",async (req,res)=>{
    let user=new User(req.body);
    let result=await user.save(); 
    result=result.toObject();
    delete result.pass;
    res.send(result);
})

app.post("/login",async (req,res)=>{
    if(req.body.email && req.body.pass){
        let user=await User.findOne(req.body).select("-pass");
        if(user){
            res.send(user)
        }else{
            res.send({result:"No user found."});
        }
    }else{
        res.send({result:"No user found."});
    }
})


app.post("/addproduct",async (req,res)=>{
    let product=new Product(req.body);
    let result=await product.save(); 
    res.send(result);
})


app.listen(5000);   