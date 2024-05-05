import { Collection } from "mongodb";
import { TutorInterface } from "../../domain/ports/TutorInterface";
import { Tutor } from "../../domain/entities/Tutors";
import { connect } from "../../../database/mongo";

export class MongoTutorRepository implements TutorInterface {
    private collection!: Collection | any;

    constructor() {
        this.initializeCollection();
    }
    // 9095a7f9-d517-4bd1-af62-247796d572dc
    async addStudentToTutor(uuidTutor: string, uuidStudent: string): Promise<Tutor | null> {
        try {
            let result = await this.findByUUID(uuidTutor);
            if (result) {
                await this.collection.updateOne({ uuid: uuidTutor }, { $addToSet: { students: uuidStudent } });
                result = await this.findByUUID(uuidTutor);
                if (result) {
                    let tutor = new Tutor(result.name, result.lastname, result.email);
                    tutor.uuid = result.uuid;
                    tutor.students = result.students;
                    return Promise.resolve(tutor);
                }
                return Promise.resolve(result);
            }
            return Promise.resolve(null);
        } catch (error) {
            console.log(error);
            return Promise.resolve(null);
        }
    }

    async create(tutor: Tutor): Promise<Tutor | null> {
        try {
            this.collection.insertOne(tutor);
            return Promise.resolve(tutor);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async update(uuid: string, tutor: Tutor): Promise<Tutor | null> {
        try {
            let tutor_exist = await this.findByUUID(uuid);
            if (tutor_exist) {
                tutor.students = tutor_exist.students;
                this.collection.updateOne({ uuid: uuid }, { $set: tutor });
                return Promise.resolve(tutor);
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

    async findByUUID(uuid: string): Promise<Tutor | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                let tutor = new Tutor(result.name, result.lastname, result.email);
                tutor.uuid = result.uuid;
                tutor.students = result.students;
                return tutor;
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async list(): Promise<Tutor[] | null> {
        try {
            const result = await this.collection.find().toArray();
            if (result) {
                return result.map((element: any) => {
                    let tutor = new Tutor(element.name, element.lastname, element.email);
                    tutor.uuid = element.uuid;
                    tutor.students = element.students;
                    return tutor;
                });
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("tutors");
    }
}