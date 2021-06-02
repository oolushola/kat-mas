const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const dotenv = require('dotenv').config()

const sgTransport = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}))


const MAIL_CONTENT = `
  <html>
    <head>
      <title>MAIL_CONTENT</title>
    </head>
    <body style="background: #ccc">
      <h2>Registration!</h2>
      <image src="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="company logo" width="100" height="100" />
      <p>Hello There, </p>
      <p>Thanks for signing up to keep in touch with kaya africa technology. From now on, you will get regular updates on cago tracking, updates regarding your trips and new features rolled out by us in due time.</p>

    </body>
  </html>
`

const mailer = async (subject, receiver) => {
  await sgTransport.sendMail({
    from: `Kaya <${process.env.EMAIL_FROM}>`,
    subject: subject,
    to: receiver,
    html: MAIL_CONTENT
  })
}

module.exports = mailer

