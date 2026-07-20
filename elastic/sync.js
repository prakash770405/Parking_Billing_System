require("dotenv").config();

const mongoose = require("mongoose");

const Vehicle = require("../models/Vehicle");
const client = require("./client");

require("../models/User");
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Mongo Connected"));

async function syncVehicles() {

    const vehicles = await Vehicle.find()
    .populate("allowedBy");

    for (let vehicle of vehicles) {

        await client.index({
            index: "vehicles",
            id: vehicle._id.toString(),

            document: {
                vehicleNo: vehicle.vehicleNo,
                vehicleType: vehicle.vehicleType,
                status: vehicle.status,
                billAmount: vehicle.billAmount,
                assistant: vehicle.allowedBy?.name
            }
        });
    }

    console.log("Elastic Sync Completed");

    process.exit();
}

syncVehicles();