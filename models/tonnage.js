const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TonnageSchema = new Schema({
  tonnage: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true })

const Tonnage = mongoose.model('Tonnage', TonnageSchema)

module.exports = Tonnage