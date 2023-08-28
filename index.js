 
const express=require('express');
require('./db/config');
const cors=require('cors')
const User=require('./db/User');
 
const app=express(); 
app.use(cors());  
app.use(express.json());
 
app.post("/register",async (req,res)=>{
    let user=new User(req.body);
    let result=await user.save(); 
    res.send(result);
})

app.listen(5000);
