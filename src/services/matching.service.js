module.exports=(

users,
exchange,
config

)=>{

const report=[]

const used=
new Set()

for(
const u
of users
){

let best=null

for(
const e
of exchange
){

if(
used.has(
e._id
)
)
continue

if(
u.asset
!==e.asset
)
continue

if(
u.type
!==e.type
)
continue

const time=

Math.abs(

new Date(
u.timestamp
)

-

new Date(
e.timestamp
)

)

const qty=

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

time
<=
config.timestampTolerance
*1000

&&

qty
<=allowed

){

best=e

break

}

}

if(best){

used.add(
best._id
)

report.push({

category:
"Matched",

reason:
"within tolerance",

user:u,

exchange:
best

})

}

else{

report.push({

category:
"Unmatched User",

reason:
"missing exchange",

user:u

})

}

}

for(
const e
of exchange
){

if(
used.has(
e._id
)
)
continue

report.push({

category:
"Unmatched Exchange",

reason:
"missing user",

exchange:e

})

}

return report

}