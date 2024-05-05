export class TutorResponse{
    public uuid: string;
    public name: string;
    public lastname: string;
    public email: string;
    public students: string[];

    constructor(uuid:string, name: string, lastname: string, email: string, students: string[]) {
        this.uuid = uuid;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.students = students;
    }
}