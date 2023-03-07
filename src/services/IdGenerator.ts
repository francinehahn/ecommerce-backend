import { v4 } from "uuid"
import { IidGenerator } from "../models/IidGenerator"

export class IdGenerator implements IidGenerator {
    public generateId (): string {
        return v4()
    }
}