
const express=require('express');
require('./db/config');
const cors=require('cors');
const User=require('./db/user');
const Product = require('./db/product');

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

app.get("/products",async (req,res)=>{
    let products= await Product.find();
    if(products.length>0){
        res.send(products);
    }else{
        res.send({result:"No products found."});
    }
});

app.delete("/products/:id",async (req,res)=>{
    const result=await Product.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get("/products/:id",async (req,res)=>{
    const result=await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result:"No data found."});
    }
});

app.put("/products/:id",async (req,res)=>{
    const result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
});

app.get("/search/:key", async (req,res)=>{
    let result=await Product.find({
         "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
         ]
    })
    res.send(result);
});

app.listen(5000);   