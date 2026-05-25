const Report=
require(
"../models/Report"
)

module.exports=
async(
rows
)=>{

await
Report.insertMany(
rows
)

return rows

}