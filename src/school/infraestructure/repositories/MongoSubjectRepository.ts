import { Collection } from "mongodb";
import { Subject } from "../../domain/entities/Subject";
import { SubjectInterface } from "../../domain/ports/SubjectInterface";
import { connect } from "../../../database/mongo";

export class MongoSubjectRepository implements SubjectInterface {
    private collection!: Collection | any;

    constructor() {
        this.initializeCollection();
    }

    async addStudentToSubject(uuidSubject: string, uuidStudent: string): Promise<Subject | null> {
        try {
            let result = await this.findByUUID(uuidSubject);
            if (result) {
                await this.collection.updateOne({ uuid: uuidSubject }, { $addToSet: { students: uuidStudent } });
                result = await this.findByUUID(uuidSubject);
                if (result) {
                    let subject = new Subject(result.name, result.description);
                    subject.uuid = result.uuid;
                    subject.students = result.students;
                    return Promise.resolve(subject);
                }
                return Promise.resolve(result);
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async create(subject: Subject): Promise<Subject | null> {
        try {
            this.collection.insertOne(subject);
            return Promise.resolve(subject);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async update(uuid: string, subject: Subject): Promise<Subject | null> {
        try {
            let subject_exist = await this.findByUUID(uuid);
            if (subject_exist) {
                subject.students = subject_exist.students;
                this.collection.updateOne({ uuid: uuid }, { $set: subject });
                subject.uuid = uuid;
                return Promise.resolve(subject);
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

    async findByUUID(uuid: string): Promise<Subject | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                let subject = new Subject(result.name, result.description);
                subject.uuid = result.uuid;
                subject.students = result.students;
                return subject;
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async findAllSubjectsByStudent(uuidStudent: string): Promise<Subject[] | null> {
        try {
            const result = await this.collection.find({ students: uuidStudent }).toArray();
            if (result) {
                return result.map((element: any) => {
                    let subject = new Subject(element.name, element.description);
                    subject.uuid = element.uuid;
                    subject.students = element.students;
                    return subject;
                });
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async list(): Promise<Subject[] | null> {
        try {
            const result = await this.collection.find().toArray();
            if (result) {
                return result.map((element: any) => {
                    let subject = new Subject(element.name, element.description);
                    subject.uuid = element.uuid;
                    subject.students = element.students;
                    return subject;
                });
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("subjects");
    }
}