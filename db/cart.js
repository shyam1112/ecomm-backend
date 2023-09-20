const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,
    img:String,
    size:String
});
module.exports=mongoose.model('carts',cartSchema);