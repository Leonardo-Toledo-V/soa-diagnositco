import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { setupTutorEndpoints } from './school/infraestructure/endpoints/TutorEndpoints';
import { setupSubjectEndpoints } from './school/infraestructure/endpoints/SubjectEndpoints';
import { setupStudentEndpoints } from './school/infraestructure/endpoints/StudentEndpoints';

dotenv.config();

const app = express();
app.use(cors());


const HOST:string = process.env.HOST_SERVER || '0.0.0.0';
const PORT:number  = Number(process.env.PORT_SERVER) || 8080;

app.use(express.static(path.join(__dirname, './public/images')));
app.use(express.json()); 
app.use(morgan('dev'))
setupTutorEndpoints(app);
setupSubjectEndpoints(app);
setupStudentEndpoints(app);

let server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on host ${HOST} and port ${PORT}`);
});


export { app, server };