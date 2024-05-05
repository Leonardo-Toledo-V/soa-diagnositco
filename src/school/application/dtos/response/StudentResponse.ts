export class StudentResponse {
    public uuid: string;
    public name: string;
    public lastname: string;
    public email: string;
    public tutor: string;
    public subjects: string[];

    constructor(uuid: string, name: string, email: string, tutor: string, subjects: string[], lastname: string) {
        this.uuid = uuid;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.tutor = tutor;
        this.subjects = subjects;
    }
}