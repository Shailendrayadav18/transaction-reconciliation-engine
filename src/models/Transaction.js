const mongoose=require("mongoose")

module.exports=
mongoose.model(
"Transaction",

new mongoose.Schema({

source:{
type:String,
required:true
},

transactionId:String,

timestamp:Date,

asset:String,

quantity:Number,

type:String,

matched:{
type:Boolean,
default:false
},

raw:Object,

validationErrors:[String]

},{
timestamps:true
})
)