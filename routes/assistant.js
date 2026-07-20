const express = require("express");
const Vehicle = require("../models/Vehicle");

const verify = require("../middleware/verify");
const role = require("../middleware/role");

const router = express.Router();

router.get(
"/assistant",
verify,
role("assistant"),
async(req,res)=>{

    const vehicles = await Vehicle.find({
        status:"parked"
    });

    res.render("assistant",{vehicles});
});

router.post(
"/entry",
verify,
role("assistant"),
async(req,res)=>{

    const {vehicleNo,vehicleType} = req.body;

    await Vehicle.create({

        vehicleNo,
        vehicleType,

        allowedBy:req.user.id
    });

    res.redirect("/assistant");
});

router.post(
"/exit/:id",
verify,
role("assistant"),
async(req,res)=>{

    const vehicle =
    await Vehicle.findById(req.params.id);

    vehicle.exitTime = new Date();

    vehicle.status = "left";

    const minutes =
    Math.ceil(
        (vehicle.exitTime - vehicle.entryTime)
        /(1000*60)
    );

    vehicle.billAmount = minutes*10;

    await vehicle.save();

    res.redirect("/assistant");
});

module.exports = router;