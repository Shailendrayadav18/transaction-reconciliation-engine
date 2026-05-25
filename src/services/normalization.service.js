const aliases = {

  BTC: "BITCOIN",
  BITCOIN: "BITCOIN",

  ETH: "ETHEREUM",
  ETHEREUM: "ETHEREUM"

};



const typeMap = {

  TRANSFER_OUT: "TRANSFER_IN"

};



module.exports = (row) => {

  row.asset = String(
    row.asset || ""
  )
  .trim()
  .toUpperCase();



  row.asset =
    aliases[row.asset]
    ||
    row.asset;



  row.type = String(
    row.type || ""
  )
  .trim()
  .toUpperCase();



  if (
    typeMap[
      row.type
    ]
  ) {

    row.type =
      typeMap[
        row.type
      ];

  }



  row.quantity =
    Number(
      row.quantity
    );



  return row;

};