const fs = require("fs");

const path = require("path");

const { Parser } =
require("json2csv");



module.exports = (

rows,

runId

) => {

const reportsDir =

path.join(
process.cwd(),
"reports"
);



// Create reports folder if missing
if (
!fs.existsSync(
reportsDir
)
) {

fs.mkdirSync(
reportsDir,
{
recursive:true
}
);

}



const csv =

new Parser()
.parse(
rows
);



const file =

path.join(

reportsDir,

`${runId}.csv`

);



fs.writeFileSync(

file,

csv,

"utf8"

);



return file;

};