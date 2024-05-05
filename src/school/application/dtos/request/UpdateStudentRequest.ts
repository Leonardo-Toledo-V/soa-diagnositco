export class UpdateStudentRequest{
    public name: string;
    public email: string;
    public lastname: string;
    public tutor: string;

    constructor(name: string, email: string, tutor: string, lastname: string) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.tutor = tutor;
    }
}