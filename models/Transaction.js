const mongoose=require("mongoose")

module.exports=
mongoose.model(
"Transaction",

new mongoose.Schema({

source:String,

transactionId:String,

timestamp:Date,

asset:String,

quantity:Number,

type:String,

raw:Object,

validationErrors:[String]

})
)