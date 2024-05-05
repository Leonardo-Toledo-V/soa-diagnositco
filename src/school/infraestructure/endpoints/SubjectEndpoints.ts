import { Express } from "express";
import { createSubjectController, deleteSubjectController, getSubjectByUUIDController, getSubjectsByStudentUUIDController, listSubjectsController, updateSubjectController } from "../Dependencies";

const MODEL_URL = "subjects/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupSubjectEndpoints(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}`, createSubjectController.execute.bind(createSubjectController));
    app.put(`${BASE_URL}${MODEL_URL}:uuid`, updateSubjectController.execute.bind(updateSubjectController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, deleteSubjectController.execute.bind(deleteSubjectController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid`, getSubjectByUUIDController.execute.bind(getSubjectByUUIDController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid/student`, getSubjectsByStudentUUIDController.execute.bind(getSubjectsByStudentUUIDController));
    app.get(`${BASE_URL}${MODEL_URL}`, listSubjectsController.execute.bind(listSubjectsController));
}