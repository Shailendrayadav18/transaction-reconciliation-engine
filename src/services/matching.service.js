module.exports = (
  users,
  exchange,
  config
) => {

const report=[]

const used=
new Set()



for(
const u
of users
){

let found=
null



for(
const e
of exchange
){

if(
used.has(
String(e._id)
)
)
continue



if(
u.asset!==e.asset
)
continue



if(
u.type!==e.type
)
continue



found=e



const timeDiff=

Math.abs(

new Date(
u.timestamp
)

-

new Date(
e.timestamp
)

)



const qtyDiff=

Math.abs(

u.quantity
-
e.quantity

)



const allowed=

u.quantity
*
config.quantityTolerance
/
100



if(

timeDiff
<=
config.timestampTolerance
*1000

&&

qtyDiff
<=
allowed

){

used.add(
String(
e._id
)
)

report.push({

category:
"Matched",

reason:
"within tolerance",

user:u,

exchange:e

})

found=null

break

}



}



if(
found
){

used.add(
String(
found._id
)
)

report.push({

category:
"Conflicting",

reason:
"timestamp or quantity outside tolerance",

user:u,

exchange:found

})

continue

}



report.push({

category:
"Unmatched User",

reason:
"not found",

user:u

})

}



exchange.forEach(
e=>{

if(
used.has(
String(
e._id
)
)
)
return



report.push({

category:
"Unmatched Exchange",

reason:
"not found",

exchange:e

})

}

)



return report

}