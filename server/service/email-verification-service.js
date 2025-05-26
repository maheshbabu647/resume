import mailTransporter from "../config/email-config.js";
import { createToken } from "../util/jwt.js";

const sendVerificationMail = async (userId, userName, userEmail) => {
    
    try{    

        const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:4000'
        const token = await createToken({userId})
        const verficationLink = `${SERVER_BASE_URL}/task-manager/api/v1/user/verify/${token}`

        const mailBody = `<h2>Dear ${userName}</h2>
        <p>Thank you for registering with us.
        To complete your account setup, please verify your email address by clicking the link below:</P>

        <a href="${verficationLink}" style="text-decoration : none; font-size : 24px;">Verify Your Email</a>

        <p>If you did not request this verification, please ignore this email. This link will expire in 24hrs.
        If you have any questions, feel free to reach out to our support team.</P>

        <h3>Best regards</h3>`

        const mailOptions = {
            from : 'someting@gmail.com',
            to : userEmail,
            subject : 'Email Verification',
            html : mailBody           
        }

        const response = await mailTransporter.sendMail(mailOptions)

    }
    catch(error){
       const err = new Error()
        err.name = 'VERIFICATION MAIL NOT SENT'
        err.message = error.message

        throw err
    }
}

export default sendVerificationMail