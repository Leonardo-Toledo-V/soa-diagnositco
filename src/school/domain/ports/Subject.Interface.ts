import { Subject } from "../entities/Subject";

export interface SubjectInterface{
    create(subject: Subject): Promise<Subject|null>;
    update(uuid:string, subject: Subject): Promise<Subject|null>;
    delete(uuid: string): Promise<void>;
    findByUUID(uuid: string): Promise<Subject|null>;
    findAllSubjectsByStudent(uuidStudent: string): Promise<Subject[]|null>;
    list(): Promise<Subject[]|null>;
    addStudentToSubject(uuidSubject: string, uuidStudent: string): Promise<Subject|null>; //no usecase
}