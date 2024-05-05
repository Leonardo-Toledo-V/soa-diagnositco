import { Express } from "express";
import { createTutorController, deleteTutorController, getTutorByUUIDController, listTutorsController, updateTutorController } from "../Dependencies";

const MODEL_URL = "tutors/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupTutorEndpoints(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}`, createTutorController.execute.bind(createTutorController));
    app.put(`${BASE_URL}${MODEL_URL}:uuid`, updateTutorController.execute.bind(updateTutorController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, deleteTutorController.execute.bind(deleteTutorController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid`, getTutorByUUIDController.execute.bind(getTutorByUUIDController));
    app.get(`${BASE_URL}${MODEL_URL}`, listTutorsController.execute.bind(listTutorsController));
}