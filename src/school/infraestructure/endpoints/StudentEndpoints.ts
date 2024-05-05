import { Express } from "express";
import { addSubjectToStudentController, addTutorToStudentController, createStudentController, deleteStudentController, deleteSubjectController, getStudentByUUIDController, getStudentsByTutorController, getSubjectByUUIDController, getSubjectsByStudentUUIDController, listStudentsController, listSubjectsController, updateStudentController, updateSubjectController } from "../Dependencies";

const MODEL_URL = "students/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupStudentEndpoints(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}`, createStudentController.execute.bind(createStudentController));
    app.put(`${BASE_URL}${MODEL_URL}:uuid`, updateStudentController.execute.bind(updateStudentController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, deleteStudentController.execute.bind(deleteStudentController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid`, getStudentByUUIDController.execute.bind(getStudentByUUIDController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid/tutor`, getStudentsByTutorController.execute.bind(getStudentsByTutorController));
    app.get(`${BASE_URL}${MODEL_URL}`, listStudentsController.execute.bind(listStudentsController));
    app.post(`${BASE_URL}${MODEL_URL}:uuidStudent/student/:uuidSubject/subject`, addSubjectToStudentController.execute.bind(addSubjectToStudentController));
    app.post(`${BASE_URL}${MODEL_URL}:uuidStudent/student/:uuidTutor/tutor`, addTutorToStudentController.execute.bind(addTutorToStudentController));
}