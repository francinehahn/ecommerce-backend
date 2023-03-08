import { SentMessageInfo, Transporter } from "nodemailer"

export interface ImailTransporter {
    createTransport (): Transporter<SentMessageInfo>
}