import { AuthenticationData } from "./AuthenticationData"


export interface Iauthenticator {
    generateToken ({id}: AuthenticationData): string
    getTokenData (token: string): AuthenticationData
}