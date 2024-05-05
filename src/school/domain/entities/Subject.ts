import { v4 as uuidv4 } from 'uuid';

export class Subject {
    public uuid: string;
    public name: string;
    public description: string;
    public students: string[];

    constructor(name: string, description: string) {
        this.uuid = uuidv4();
        this.name = name;
        this.description = description;
        this.students = [];
    }
}