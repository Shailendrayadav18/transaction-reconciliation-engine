const assets={

BTC:"BITCOIN",

ETH:"ETHEREUM"

}

const typeMap={

TRANSFER_OUT:
TRANSFER_IN

}

module.exports=(r)=>{

r.asset=
(
assets[
r.asset
]||
r.asset
)
.toUpperCase()

if(
typeMap[
r.type
]
)
r.type=
typeMap[
r.type
]

return r

}