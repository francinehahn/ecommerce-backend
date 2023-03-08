import { IpasswordGenerator } from "../../src/models/IpasswordGenerator"


export class PasswordGeneratorMock implements IpasswordGenerator {
    generatePassword = () => {
        return "password"
    }
}