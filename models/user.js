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
    accountName: { type: String },
    sameAsName: { type: String }
  },
  guarantor: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNo: [],
    address: { type: String },
    occupation: { type: String },
    workAddress: { type: String }
  },
  nextOfKin: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNo: [],
    address: { type: String },
  },
  userType: {
    type: String,
    enum:["transporter", "business", "admin"],
    required: true
  },
  documents: {
    nin: { type: String },
    proofOfAddress: { type: String },
    guarantorProofOfId: { type: String },
    guarantorWorkId: { type: String }
  },
  transporterAttestation: {
    type: Boolean,
    default: false
  },
  businessCategory: {
    type: String,
    enum: ["customer", "b2b"]
  },
  adminStatus: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    adminCategory: {
      type: String,
      enum: ["superAdmin", "admin", "hr", "ops", "transport", "finance", "fieldOps"]
    }
  },
  assigned:{
    products: [{
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    loadingSites: [{
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'LoadingSite'
    }]
  }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel