const fs=require("fs")
const csv=require("csv-parser")

module.exports=(file)=>

new Promise((resolve)=>{

const rows=[]

fs.createReadStream(file)

.pipe(csv())

.on(
"data",
r=>rows.push(r)
)

.on(
"end",
()=>resolve(rows)
)

})