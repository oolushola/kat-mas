const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSubheadingSchema = new Schema({
    clientId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    replaceSalesOrderNo: {
        required: true,
        type: String
    },

    replaceInvoiceNo: {
        required: true,
        type: String
    },

    createdBy: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true} )

const invoiceSubheadingModel = mongoose.model('invoiceSubheading', invoiceSubheadingSchema)
module.exports = invoiceSubheadingModel