const express =
require("express")

const multer =
require("multer")

const router =
express.Router()

const upload=
multer({

dest:
"uploads"

})

const c=
require(
"../controllers/reconciliation.controller"
)



router.post(

"/reconcile",

upload.fields([

{
name:
"user"
},

{
name:
"exchange"
}

]),

c.run

)



router.get(

"/report/:runId",

c.report

)



router.get(

"/report/:runId/summary",

c.summary

)



router.get(

"/report/:runId/unmatched",

c.unmatched

)



module.exports=
router