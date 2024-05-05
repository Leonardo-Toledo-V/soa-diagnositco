import { Student } from "../entities/Student";

export interface StudentInterface{
    create(student: Student): Promise<Student|null>;
    update(uuid:string, student: Student): Promise<Student|null>;
    delete(uuid: string): Promise<void>;
    findByUUID(uuid: string): Promise<Student|null>;
    findAllStudentsByTutor(uuidTutor: string): Promise<Student[]|null>;
    list(): Promise<Student[]|null>;
    addSubjectToStudent(uuidStudent: string, uuidSubject: string): Promise<Student|null>;
    addTutorToStudent(uuidStudent: string, uuidTutor: string): Promise<Student|null>;
}