const csvService = require("./csv.service");
const validate = require("./validation.service");
const normalize = require("./normalization.service");
const match = require("./matching.service");
const exportReport = require("../utils/csvExport");

const Transaction =
require("../models/Transaction");

module.exports =
async (

userFile,
exchangeFile,
config

)=>{

let userRows =
await csvService(
userFile
)

let exchangeRows =
await csvService(
exchangeFile
)



userRows =
await validate(
userRows,
"user"
)

exchangeRows =
await validate(
exchangeRows,
"exchange"
)



userRows =
userRows.map(
normalize
)

exchangeRows =
exchangeRows.map(
normalize
)



await Transaction.insertMany(

userRows.map(
r=>({
...r,
source:"user"
})
)

)

await Transaction.insertMany(

exchangeRows.map(
r=>({
...r,
source:"exchange"
})
)

)



const report =

match(

userRows,

exchangeRows,

config

)



const runId =
Date.now()
.toString()



const reportFile =

exportReport(

report,

runId

)



return {

runId,

rows:
report,

file:
reportFile

}

}