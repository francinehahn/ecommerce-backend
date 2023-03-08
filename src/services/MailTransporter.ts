import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { ImailTransporter } from "../models/ImailTransporter"

dotenv.config()

export class MailTransporter implements ImailTransporter {
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