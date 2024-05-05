export class UpdateTutorRequest{
    public name: string;
    public email: string;
    public lastname: string;

    constructor(name: string, email: string, lastname: string) {
        this.name = name;
        this.email = email;
        this.lastname = lastname;
    }
}