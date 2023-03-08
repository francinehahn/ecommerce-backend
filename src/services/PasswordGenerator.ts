import { IpasswordGenerator } from "../models/IpasswordGenerator"

export class PasswordGenerator implements IpasswordGenerator {
    generatePassword = () => {
        return Math.random().toString(36).slice(-10)
    }
}