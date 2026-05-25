const DataQualityIssue =
require("../models/DataQualityIssue");

module.exports =
async (
rows,
source
)=>{

const valid=[];

for(
let i=0;
i<rows.length;
i++
){

const row=
rows[i];

const errors=[];



// timestamp validation
if(
!row.timestamp
){

errors.push(
"missing timestamp"
);

}
else{

const date=
new Date(
row.timestamp
);

if(
isNaN(
date.getTime()
)
){

errors.push(
"invalid timestamp"
);

}

}



// quantity validation
const qty=
Number(
row.quantity
);

if(
isNaN(qty)
||
qty<=0
){

errors.push(
"invalid quantity"
);

}



// asset validation
if(
!row.asset
){

errors.push(
"missing asset"
);

}



// save issue
if(
errors.length
){

await DataQualityIssue.create({

source,

rowNumber:
i+1,

reason:
errors.join(", "),

raw:
row

});

// DO NOT INSERT BAD ROW
continue;

}



// normalize types
row.quantity=
qty;

row.timestamp=
new Date(
row.timestamp
);

valid.push(
row);

}

return valid;

};