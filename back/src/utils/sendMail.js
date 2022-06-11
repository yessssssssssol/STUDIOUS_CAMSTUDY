import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GOOGLE_ID,
        pass: process.env.GOOGLE_SECRET,
    },
});

module.exports = (to, subject, text) =>
    new Promise((resolve, reject) => {
        const message = {
            from: `"[ChairKing] Sign Up" <${process.env.GOOGLE_ID}>`,
            to,
            subject,
            text,
        };
        transport.sendMail(message, (err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
