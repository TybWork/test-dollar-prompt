// import nodemailer from "nodemailer";

// export const sendEmail = async (email, subject, message) => {
//     try {
//         // const transporter = nodemailer.createTransport({
//         //     service: 'gmail',
//         //     auth: {
//         //         user: process.env.HOST,
//         //         pass: process.env.PASS
//         //     },
//         // });
//         var transport = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.PASS
//             }
//         });

//         transport.sendMail({
//             from: process.env.USER,
//             to: email,
//             subject: subject,
//             html: message
//         });
//         console.log("Email sent Successfully")
//     } catch (error) {
//         console.log("Email not sent")
//         console.log(error)
//         return error;
//     }
// };

import nodemailer from "nodemailer";
export const sendEmail = async (email, subject, message) => {
    try {
        // Create the transporter using Gmail's SMTP server
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.HOST_EMAIL,  // Your Gmail address (e.g., your-email@gmail.com)
                pass: process.env.HOST_MAIL_PASS   // The app password generated in Gmail settings
            }
        });

        // Email message options
        const mailOptions = {
            from: process.env.HOST_EMAIL,  // Sender's email (your Gmail address)
            to: email, // Recipient email
            subject: subject, // Email subject
            html: message, // HTML email content
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Email not sent:", error);
        return { success: false, message: "Email not sent", error };
    }
};



// .............. using smtp ..........................


// ...................................
// import tls from 'tls';
// import { Buffer } from 'buffer';
// import tls from 'tls'; // Add tls import

// export const sendEmail = (recipientEmail) => {
//     // Gmail SMTP server settings
//     const smtpHost = 'smtp.gmail.com';
//     const smtpPort = 465;  // 465 SSL port for Gmail
//     const userEmail = 'dollarprompts@gmail.com';  // Your Gmail address
//     const appPassword = 'wfqp bhuu tygg ghaf';  // Your Gmail App Password (NOT your Gmail password)
//     const subject = 'Email Verification';

//     // Prepare the email message in proper SMTP format
//     const emailMessage = `From: ${userEmail}
// To: ${recipientEmail}
// Subject: ${subject}
// MIME-Version: 1.0
// Content-Type: text/plain; charset=UTF-8

// Click the link below to verify your email address:
// http://localhost:4001/api/password-change/your-verification-link`;

//     // Create a secure SSL/TLS connection to the SMTP server
//     const socket = tls.connect(smtpPort, smtpHost, () => {
//         console.log('Connected to SMTP server');

//         // Send the EHLO command to identify to the server
//         socket.write('EHLO localhost\r\n');
//     });

//     // Define the SMTP command sequence
//     socket.on('data', (data) => {
//         const response = data.toString();
//         console.log('Server Response:', response);

//         // If the server responds with 220, it’s ready for authentication
//         if (response.includes('220')) {
//             socket.write('AUTH LOGIN\r\n');  // Start authentication process
//         }

//         // Handle username and password authentication (base64 encoded)
//         if (response.includes('334')) {
//             if (response.includes('VXNlcm5hbWU6')) {  // Expecting username prompt
//                 // Send base64 encoded username (email)
//                 const base64Email = Buffer.from(userEmail).toString('base64');
//                 socket.write(`${base64Email}\r\n`);
//             } else if (response.includes('UGFzc3dvcmQ6')) {  // Expecting password prompt
//                 // Send base64 encoded app password
//                 const base64Password = Buffer.from(appPassword).toString('base64');
//                 socket.write(`${base64Password}\r\n`);
//             }
//         }

//         // If authentication is successful (response 235), proceed to send email
//         if (response.includes('235')) {
//             console.log('Authentication successful');
//             socket.write(`MAIL FROM:<${userEmail}>\r\n`);
//             socket.write(`RCPT TO:<${recipientEmail}>\r\n`);
//             socket.write('DATA\r\n');
//             socket.write(`${emailMessage}\r\n.\r\n`);  // End the message and send it
//             socket.write('QUIT\r\n');  // End the SMTP session
//             console.log('message has been sent')
//         }

//         // Handle any other responses
//         if (response.includes('451')) {
//             console.error('SMTP protocol error, retry later.');
//             socket.end();
//         }
//     });

//     // Handle error responses
//     socket.on('error', (error) => {
//         console.error('Error:', error);
//         socket.end();
//     });

//     // Handle server closing the connection
//     socket.on('end', () => {
//         console.log('SMTP session closed');
//     });
// }