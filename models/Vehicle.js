const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({

    vehicleNo:{
        type:String,
        required:true
    },

    vehicleType:{
        type:String,
        required:true
    },

    entryTime:{
        type:Date,
        default:Date.now
    },

    exitTime:{
        type:Date
    },

    status:{
        type:String,
        enum:["parked","left"],
        default:"parked"
    },

    allowedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    billAmount:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("Vehicle",vehicleSchema);