const express = require("express");

const client =
require("../elastic/client");

const verify =
require("../middleware/verify");

const role =
require("../middleware/role");

const router = express.Router();

router.get(
"/search",
verify,
role("admin"),
(req,res)=>{

    res.render("search",{
        vehicles:[]
    });

});

router.post(
"/search",
verify,
role("admin"),
async(req,res)=>{

    const { keyword } = req.body;

    const result =
    await client.search({

        index:"vehicles",

        query:{
            multi_match:{
                query:keyword,
                fields:[
                    "vehicleNo",
                    "vehicleType",
                    "assistant"
                ]
            }
        }
    });

    const vehicles =
    result.hits.hits.map(
        item=>item._source
    );

    res.render(
        "search",
        {vehicles}
    );

});

module.exports = router;