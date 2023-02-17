export default class User {
    private id: string
    private name: string
    private email: string
    private password: string

    constructor(id: string, n: string, e: string, p: string) {
        this.id = id
        this.name = n
        this.email = e
        this.password = p
    }
}

export interface inputSignupDTO {
    name: string,
    email: string,
    password: string
}

export interface inputLoginDTO {
    email: string,
    password: string
}

export interface inputEditUserInfoDTO {
    name: string,
    email: string,
    token: string
}

export interface updateUserInfoDTO {
    id: string,
    name: string,
    email: string
}

export interface returnUserInfoDTO {
    name: string,
    email: string
}