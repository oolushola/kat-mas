const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trucksSchema = new Schema({
    truckNo: {
        required: true,
        type: String
    },

    tonnage: {
        required: true,
        ref: 'Tonnage',
        type: Schema.Types.ObjectId
    },

    transporterId: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId
    },

    moves: {
        completed: {
            type: Number,
            default: 0
        },

        allocated: {
            type: Number,
            default: 0
        },

        cancelled: {
            type: Number,
            default: 0
        },
    },

    createdBy: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId
    }
}, { timestamps: true }
)

const trucksModel = mongoose.model('Trucks', trucksSchema)

module.exports = trucksModel