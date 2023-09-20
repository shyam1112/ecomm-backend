const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,
    img:String,
    size:String,
    color1:String,
    color2:String,
    color3:String
});
module.exports=mongoose.model('Products',productSchema);