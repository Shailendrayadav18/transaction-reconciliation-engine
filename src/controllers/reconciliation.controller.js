const Report =
require(
"../models/Report"
)

const reconcile =
require(
"../services/reconciliation.service"
)

const cfg =
require(
"../config/config"
)



exports.run =
async(
req,
res
)=>{

try{

if(
!req.files
)
{

return res
.status(400)
.json({

message:
"upload files"

})

}



const config={

timestampTolerance:

req.body
.timestampTolerance

||

cfg
.timestampTolerance,

quantityTolerance:

req.body
.quantityTolerance

||

cfg
.quantityTolerance

}



const result=

await reconcile(

req.files.user[0].path,

req.files.exchange[0].path,

config

)



await Report.insertMany(

result.rows.map(
r=>({

runId:
result.runId,

...r

})
)

)



res.json({

success:true,

runId:
result.runId,

report:
result.file

})

}

catch(e){

res.status(500)
.json({

error:
e.message

})

}

}



exports.report=
async(
req,
res
)=>{

const rows=
await Report.find({

runId:
req.params.runId

})

res.json(
rows
)

}



exports.summary=
async(
req,
res
)=>{

const rows=
await Report.find({

runId:
req.params.runId

})

const data={

matched:
0,

conflicting:
0,

userOnly:
0,

exchangeOnly:
0

}



rows.forEach(
r=>{

if(
r.category==="Matched"
)
data.matched++

if(
r.category==="Conflicting"
)
data.conflicting++

if(
r.category==="Unmatched User"
)
data.userOnly++

if(
r.category==="Unmatched Exchange"
)
data.exchangeOnly++

}
)

res.json(
data
)

}



exports.unmatched=
async(
req,
res
)=>{

const rows=

await Report.find({

runId:
req.params.runId,

category:{

$in:[

"Unmatched User",

"Unmatched Exchange"

]

}

})

res.json(
rows
)

}