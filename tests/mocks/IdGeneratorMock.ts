import { IidGenerator } from "../../src/models/IidGenerator"


export class IdGeneratorMock implements IidGenerator {
    public generateId = jest.fn(() => {
        return "id"
    })
}