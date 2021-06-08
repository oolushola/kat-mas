const userModel = require('../models/user')
const { validationResult } = require('express-validator')
const file = require('../handlers/upload')
const { errorResponse, successResponse } = require('../handlers/response')

class SupportingDocuments {
  static uploadNin(req, res, next) {
    DOCUMENT_UPLOADER(req, res, 'public/documents/nin', 'nin', 'nin')
  }

  static uploadProofOfAddress(req, res, next) {
    DOCUMENT_UPLOADER(
      req, res, 'public/documents/poa', 'proofOfAddress', 'proofOfAddress'
    )
  }

  static uploadGurantorProofOfId(req, res, next) {
    DOCUMENT_UPLOADER(
      req, res, 'public/documents/guarantor', 'guarantorProofOfId', 'guarantorProofOfId'
    )
  }

  static uploadGuarantorWorkId(req, res, next) {
    DOCUMENT_UPLOADER(
      req, res, 'public/documents/guarantor', 'guarantorWorkId', 'guarantorWorkId'
    )
  }
}

const DOCUMENT_UPLOADER = (req, res, directory, uploadingFor, spot) => {
  file.UPLOAD_SINGLE_PHOTO(directory, uploadingFor, (multer) => {
    multer(req, res, async(err) => {
      if(err) {
        return errorResponse(
          res, 422, 'error uploading document', err.message
        )
      }
      try {
        const user = await userModel.findById(req.user._id)
        const document = user.documents[spot]
        if(document) {
          file.DELETE_PHOTO(document)
        }
        user.documents[spot] = req.file.path
        const result = await user.save()
        return successResponse(
          res, 200, `${uploadingFor} uploaded succesfully`, {
            documents: result.documents,
            name: `${result.firstName} ${result.lastName}`
          }
        )
      }
      catch(err) {
        errorResponse(
          res, 500, 'internal server error', err.message
        )
      }
    })
  })
}

module.exports = SupportingDocuments