export class SubjectResponse{
    public uuid: string;
    public name: string;
    public description: string;
    public students: string[];

    constructor(uuid:string, name: string, description: string, students: string[]) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.students = students;
    }
}