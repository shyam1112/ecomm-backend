const bodyParser = require('body-parser');

const express=require('express');
require('./db/config');
const cors=require('cors');
const User=require('./user');
const Product = require('./product');
const Cart=require('./cart');
const Order =require('./order')

const app=express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true,parameterLimit:100000,limit:"500mb"}));

app.post("/register",async (req,res)=>{
    let user=new User(req.body);
    let result=await user.save(); 
    result=result.toObject();
    delete result.pass;
    res.send(result);
})

app.post('/order', async (req, res) => {
    try {
      const { formData, orderData } = req.body; // Get both form data and order data from the request body
  
      // Create a new order using the Mongoose model
      const newOrder = new Order({
        userId: formData.userId,
        cart: orderData.cart,
        total: orderData.total,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
      });
      // Save the new order to the database
      const savedOrder = await newOrder.save();
  
      res.status(201).json(savedOrder); // Respond with the saved order data
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get("/order",async (req,res)=>{
    let order= await Order.find();
    if(order.length>0){
        res.send(order);
    }else{
        res.send({result:"No products found."});
    }
});




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

app.post("/addcart",async (req,res)=>{
    let cart=new Cart(req.body);
    let result=await cart.save(); 
    res.send(result);
    
})

app.delete("/carts/:id",async (req,res)=>{
    const result=await Cart.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get("/carts/:key",async (req,res)=>{
    let result=await Cart.find({
        "$or":[
           {userId:{$regex:req.params.key}}
        ]
   })
   res.send(result);
});

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