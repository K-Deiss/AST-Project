const mongoose = require('mongoose');

const maintenanceGarageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        trim: true
    },
    carsMaintained: [{
        type: mongoose.Types.ObjectId,
        ref: 'Car'
    }],
    servicesOffered: {
        type: [String],
        enum: ['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Engine Tune-Up', 'Other'],
        default: ['Other']
    },
},
    { timestamps: true, collection: "MaintenanceGarage" }

);

const MaintenanceGarage = mongoose.model('MaintenanceGarage', maintenanceGarageSchema);

module.exports = MaintenanceGarage;
