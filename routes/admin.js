const express = require("express");

const Vehicle = require("../models/Vehicle");

const verify = require("../middleware/verify");
const role = require("../middleware/role");

const router = express.Router();

router.get(
"/admin",
verify,
role("admin"),
async(req,res)=>{

    const currentVehicles =
    await Vehicle.find({
        status:"parked"
    }).populate("allowedBy");

    const exitedVehicles =
    await Vehicle.find({
        status:"left"
    }).populate("allowedBy");

    res.render("admin",{
        currentVehicles,
        exitedVehicles
    });
});


router.get(
"/revenue",
verify,
role("admin"),
async(req,res)=>{

    const start = new Date();

    start.setHours(0,0,0,0);

    const end = new Date();

    end.setHours(23,59,59,999);

    const vehicles =
    await Vehicle.find({

        exitTime:{
            $gte:start,
            $lte:end
        }
    });

    let total = 0;

    vehicles.forEach(v=>{

        total += v.billAmount;

    });

    res.render(
        "revenue",
        {total}
    );
});

module.exports = router;