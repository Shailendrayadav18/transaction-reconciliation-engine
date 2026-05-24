const mongoose=require("mongoose")

module.exports=
mongoose.model(
"Report",

new mongoose.Schema({

runId:String,

category:String,

reason:String,

user:Object,

exchange:Object

})
)