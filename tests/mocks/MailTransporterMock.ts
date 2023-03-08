import { ImailTransporter } from "../../src/models/ImailTransporter"


export class MailTransporterMock implements ImailTransporter {
    public createTransport () {
        return "email sent"
    }
}