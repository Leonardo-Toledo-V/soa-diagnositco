export class CreateStudentRequest{
    public name: string;
    public lastname: string;
    public email: string;

    constructor(name: string, email: string, lastname: string) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
    }
}