import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vehicleType: { type: String, required: true },
    licensePlate: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    currentLocation: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    status: { type: String, default: "Available" }
});

const driverModel = mongoose.models.driver || mongoose.model("driver", driverSchema);
export default driverModel;
