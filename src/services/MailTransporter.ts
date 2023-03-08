import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export class MailTransporter {
    public createTransport () {
        return nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            },
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false
            }
        })
    }
}