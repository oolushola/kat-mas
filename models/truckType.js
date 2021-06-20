const mongoose = require('mongoose')
const Schema = mongoose.Schema

const truckTypeSchema = new Schema ({
    truckType: {
        required: true,
        type: String
    },

    description: {
        type: String
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true} )

const truckTypeModel = mongoose.model('truckType', truckTypeSchema)

module.exports = truckTypeModel