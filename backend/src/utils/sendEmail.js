import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, message) => {
    try {
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.HOST,
        //         pass: process.env.PASS
        //     },
        // });
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        transport.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: message
        });
        console.log("Email sent Successfully")
    } catch (error) {
        console.log("Email not sent")
        console.log(error)
        return error;
    }
};
