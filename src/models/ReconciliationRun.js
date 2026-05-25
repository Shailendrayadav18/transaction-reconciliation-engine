const mongoose=require("mongoose")

module.exports=
mongoose.model(
"Run",

new mongoose.Schema({

startedAt:{
type:Date,
default:Date.now
},

config:Object

})
)