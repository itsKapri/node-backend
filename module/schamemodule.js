const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"please add the contact email"],
    },
    number:{
        type:Number,
        required:[true,"please add the contact number"],
    }
},{
    timestamp:true
})
module.exports=mongoose.model("contact",contactSchema);