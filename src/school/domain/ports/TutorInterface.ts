import { Tutor } from "../entities/Tutors";

export interface TutorInterface {
    create(tutor: Tutor): Promise<Tutor|null>;
    update(uuid:string, tutor: Tutor): Promise<Tutor|null>;
    delete(uuid: string): Promise<void>;
    findByUUID(uuid: string): Promise<Tutor|null>;
    list(): Promise<Tutor[]|null>;
    addStudentToTutor(uuidTutor: string, uuidStudent: string): Promise<Tutor|null>;  //no usecase
}