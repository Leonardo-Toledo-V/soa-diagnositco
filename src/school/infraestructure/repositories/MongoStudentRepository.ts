import { Collection } from "mongodb";
import { StudentInterface } from "../../domain/ports/StudentInterface";
import { connect } from "../../../database/mongo";
import { Student } from "../../domain/entities/Student";
import { MongoSubjectRepository } from "./MongoSubjectRepository";
import { MongoTutorRepository } from "./MongoTutorRepository";

export class MongoStudentRepository implements StudentInterface {
    private collection!: Collection | any;

    private _subjectRepository: MongoSubjectRepository | null = null;
    private _tutorRepository: MongoTutorRepository | null = null;

    get subjectRepository(): MongoSubjectRepository {
        if (!this._subjectRepository) {
            this._subjectRepository = new MongoSubjectRepository();
        }
        return this._subjectRepository;
    }

    get tutorRepository(): MongoTutorRepository {
        if (!this._tutorRepository) {
            this._tutorRepository = new MongoTutorRepository();
        }
        return this._tutorRepository;
    }

    constructor() {
        this.initializeCollection();
    }

    async create(student: Student): Promise<Student | null> {
        try {
            this.collection.insertOne(student);
            return Promise.resolve(student);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async update(uuid: string, student: Student): Promise<Student | null> {
        try {
            let student_exist = await this.findByUUID(uuid);
            if (student_exist) {
                student.subjects = student_exist.subjects;
                student.tutor = student_exist.tutor;
                this.collection.updateOne({ uuid: uuid }, { $set: student });
                return Promise.resolve(student);
            } else {
                return Promise.resolve(null);
            }
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async delete(uuid: string): Promise<void> {
        try {
            this.collection.deleteOne({ uuid: uuid });
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    }

    async findByUUID(uuid: string): Promise<Student | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                let subject = new Student(result.name, result.email, result.lastname);
                subject.uuid = result.uuid;
                subject.tutor = result.tutor;
                subject.subjects = result.subjects;
                return subject;
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async findAllStudentsByTutor(uuidTutor: string): Promise<Student[] | null> {
        try {
            const result = await this.collection.find({ tutor: uuidTutor }).toArray();
            if (result) {
                return result.map((element: any) => {
                    let tutor = new Student(element.name, element.email, element.lastname);
                    tutor.uuid = element.uuid;
                    tutor.tutor = element.tutor;
                    tutor.subjects = element.subjects;
                    return tutor;
                });
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async list(): Promise<Student[] | null> {
        try {
            const result = await this.collection.find().toArray();
            if (result) {
                return result.map((element: any) => {
                    let tutor = new Student(element.name, element.email, element.lastname);
                    tutor.tutor = element.tutor;
                    tutor.subjects = element.subjects;
                    tutor.uuid = element.uuid;
                    return tutor;
                });
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async addSubjectToStudent(uuidStudent: string, uuidSubject: string): Promise<Student | null> {
        try {
            let result = await this.findByUUID(uuidStudent);
            if (result) {
                await this.collection.updateOne({ uuid: uuidStudent }, { $addToSet: { subjects: uuidSubject } });
                result = await this.findByUUID(uuidStudent);
                if (result) {
                    let student = new Student(result.name, result.email, result.lastname);
                    student.uuid = result.uuid;
                    student.tutor = result.tutor;
                    student.subjects = result.subjects;
                    let r = await this.subjectRepository.addStudentToSubject(uuidSubject, uuidStudent);
                    console.log(r);
                    return Promise.resolve(student);
                }
                return Promise.resolve(result);
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async addTutorToStudent(uuidStudent: string, uuidTutor: string): Promise<Student | null> {
        try {
            let result = await this.findByUUID(uuidStudent);
            if (result) {
                await this.collection.updateOne({ uuid: uuidStudent }, { $set: { tutor: uuidTutor } });
                if (result) {
                    let student = new Student(result.name, result.email, result.lastname);
                    student.uuid = result.uuid;
                    student.tutor = uuidTutor;
                    student.subjects = result.subjects;
                    let r = await this.tutorRepository.addStudentToTutor(uuidTutor, uuidStudent);
                    console.log(r);
                    return Promise.resolve(student);
                }
                return Promise.resolve(result);
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("students");
    }
}