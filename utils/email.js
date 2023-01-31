const nodemailer = require("nodemailer")

exports.sendEmail = ({ sendTo, sub, text }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "xyzsk2017@gmail.com",
            pass: "vuftzcguvdfsggvw"
        }
    })//transporter

    transporter.sendMail({
        to: sendTo,
        from: "xyzsk2017@gmail.com",
        subject: sub,
        text: text
    }, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("email send successfully");
        }
    })
}