module.exports=(row)=>{

const errors=[]

if(!row.timestamp)
errors.push(
"missing timestamp"
)

if(
!row.asset
)
errors.push(
"missing asset"
)

if(
Number(
row.quantity
)<=0
)
errors.push(
"invalid quantity"
)

return errors
}