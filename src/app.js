const express=require("express")

const app=express()

app.use(express.json())

app.get("/", (req, res) => {

res.status(200).json({

status: "running",

message:
"Transaction Reconciliation Engine API"

});

})

app.use(
"/api",
require("./routes/reconciliation.routes")
)

module.exports=app;