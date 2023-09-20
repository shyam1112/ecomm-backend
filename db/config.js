const mongoose=require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');

mongoose.set("strictQuery", false);
const DB = "mongodb+srv://shyam1112:shyam1112@cluster0.m5egl9t.mongodb.net/products?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})