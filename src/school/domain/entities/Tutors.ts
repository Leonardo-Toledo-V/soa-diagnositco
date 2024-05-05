import { v4 as uuidv4 } from 'uuid';

export class Tutor {
    public uuid: string;
    public name: string;
    public lastname: string;
    public email: string;
    public students: string[];

    constructor(name: string, lastname: string, email: string) {
        this.uuid = uuidv4();
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.students = [];
    }
}