const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loadingSiteSchema = new Schema({
    loadingSite: {
        required: true,
        type: String
        },

    description: {
        type: String
    },

    createdBy: {
        type: Schema.Types.ObjectId,
    }
}, { timestamps: true })

const loadingSiteModel = mongoose.model('LoadingSite', loadingSiteSchema)

module.exports = loadingSiteModel