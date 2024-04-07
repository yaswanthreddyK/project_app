import nodemailer from 'nodemailer'
import {google} from "googleapis"

async function sendEmail({to, subject, text}){
  
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oauth2Client.credentials = {refresh_token: process.env.REFRESH_TOKEN}

try {
        const accessToken = await oauth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.EMAIL,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: accessToken
            },
          });
    
          const mailOptions = {
            from: 'Yaswanth <yaswanthreddy1729@gmail.com',
            to: 'kk2298@srmist.edu.in',
            subject: subject || 'no subject',
            text: text || 'Hi',
            html: `<h1>${text || "Hi"}</h1>`,
          }
    
        const result =  transporter.sendMail(mailOptions)
        return result
} catch (error) {
    console.log('Nodemailer.js :: sendEmail ', error)
    return null
}
  }

  export default sendEmail