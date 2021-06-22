const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    product: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
},
{timestamps: true} )

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel