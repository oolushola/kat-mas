const mongoose = require('mongoose')
const Schema = mongoose.Schema

const availableCargoSchema = new Schema({
    clientId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    expectedTrucks: {
        required: true,
        type: Number
    },

    customer: {
        required: true,
        type: String
    },

    destination: {
        state: {
            required: true,
            type: String
        },
        exactLocation: [
           { required: true, 
               type: String
            }
        ]
    },

    availabilityStatus: {
        required: true,
        type: Boolean,
        default: true
    },

    createdBy: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true } )

const availableCargoModel = mongoose.model('AvailableCargo', availableCargoSchema)
module.exports = availableCargoModel