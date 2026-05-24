module.exports=(
users,
exchange,
config
)=>{

const report=[]

users.forEach(u=>{

let found=
exchange.find(e=>{

const t=
Math.abs(
new Date(
u.timestamp
)-

new Date(
e.timestamp
)
)

const qty=
Math.abs(
u.quantity-
e.quantity
)

return(

u.asset===e.asset

&&

u.type===e.type

&&

t<=
config.timestampTolerance
*1000

&&

qty<=
(
u.quantity*
config.quantityTolerance
/100
)

)

})

if(found){

report.push({

category:
"matched",

reason:
"within tolerance",

user:u,

exchange:found

})

}else{

report.push({

category:
"unmatched_user",

reason:
"not found",

user:u

})

}

})

return report
}