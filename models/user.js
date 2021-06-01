const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
  },
  phoneNo: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  photo: {
    type: String
  },
  accountDetails: {
    bankName: { type: String },
    accountNo: { type: String },
    accountName: { type: String }
  },
  guarantor: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNo: [],
    address: { type: String }
  },
  nextOfKin: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNo: [],
    address: { type: String },
    occupation: { type: String },
    workAddress: { type: String },

  },
  userType: {
    type: Number,
    enum:[1, 2, 3],
    default: 1
  },
  documents: {
    nin: { type: String },
    proofOfAddress: { type: String },
    gurantorProofOfId: { type: String },
    guarantorWorkId: { type: String }

  },
  transporterAttestation: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel