import { UpdateTutorUseCases } from './../application/use_cases/UpdateTutorUseCases';
import { ListTutorsController } from './controllers/ListTutorsController';
import { GetTutorByUUIDUseCases } from './../application/use_cases/GetTutorByUUIDUseCases';
import { DeleteTutorUseCases } from './../application/use_cases/DeleteTutorUseCases';
import { CreateTutorUseCases } from './../application/use_cases/CreateTutorUseCases';
import { UpdateSubjectUseCases } from './../application/use_cases/UpdateSubjectUseCases';
import { ListSubjectsUseCases } from './../application/use_cases/ListSubjectsUseCases';
import { GetSubjectByUUIDUseCases } from './../application/use_cases/GetSubjectByUUIDUseCases';
import { GetSubjectsByStudentUUIDUseCases } from './../application/use_cases/GetSubjectsByStudentUUIDUseCases';
import { DeleteSubjectUseCases } from './../application/use_cases/DeleteSubjectUseCases';
import { CreateSubjectUseCases } from './../application/use_cases/CreateSubjectUseCases';
import { DeleteStudentController } from './controllers/DeleteStudentController';
import { CreateStudentController } from './controllers/CreateStudentController';
import { AddTutorToStudentController } from './controllers/AddTutorToStudentController';
import { AddSubjectToStudentController } from './controllers/AddSubjectToStudentController';
import { UpdateStudentUseCases } from './../application/use_cases/UpdateStudentUseCases';
import { ListStudentsUseCases } from './../application/use_cases/ListStudentsUseCases';
import { GetStudentsByTutorUseCases } from './../application/use_cases/GetStudentsByTutorUseCases';
import { GetStudentByUUIDUseCases } from './../application/use_cases/GetStudentByUUIDUseCases';
import { DeleteStudentUseCases } from './../application/use_cases/DeleteStudentUseCases';
import { CreateStudentUseCases } from './../application/use_cases/CreateStudentUseCases';
import { AddTutorToStudentUseCases } from './../application/use_cases/AddTutorToStudentUseCases';
import { AddSubjectToStudentUseCases } from "../application/use_cases/AddSubjectToStudentUseCases";
import { MongoStudentRepository } from "./repositories/MongoStudentRepository";
import { MongoSubjectRepository } from "./repositories/MongoSubjectRepository";
import { MongoTutorRepository } from "./repositories/MongoTutorRepository";
import { GetStudentByUUIDController } from './controllers/GetStudentByUUIDController';
import { GetStudentsByTutorController } from './controllers/GetStudentsByTutorController';
import { ListStudentsController } from './controllers/ListStudentsController';
import { UpdateStudentController } from './controllers/UpdateStudentController';
import { CreateSubjectController } from './controllers/CreateSubjectController';
import { DeleteSubjectController } from './controllers/DeleteSubjectController';
import { GetSubjectByUUIDController } from './controllers/GetSubjectByUUIDController';
import { GetSubjectsByStudentUUIDController } from './controllers/GetSubjectsByStudentUUIDController';
import { ListSubjectsController } from './controllers/ListSubjectsController';
import { UpdateSubjectController } from './controllers/UpdateSubjectController';
import { ListTutorsUseCases } from '../application/use_cases/ListTutorsUseCases';
import { UpdateTutorController } from './controllers/UpdateTutorController';
import { GetTutorByUUIDController } from './controllers/GetTutorByUUIDController';
import { DeleteTutorController } from './controllers/DeleteTutorController';
import { CreateTutorController } from './controllers/CreateTutorController';

//Student database
export const databaseStudent = new MongoStudentRepository();

//Student use cases
export const addSubjectToStudentUseCases = new AddSubjectToStudentUseCases(databaseStudent);
export const addTutorToStudentUseCases = new AddTutorToStudentUseCases(databaseStudent);
export const createStudentUseCases = new CreateStudentUseCases(databaseStudent);
export const deleteStudentUseCases = new DeleteStudentUseCases(databaseStudent);
export const getStudentByUUIDUseCases = new GetStudentByUUIDUseCases(databaseStudent);
export const getStudentsByTutorUseCases = new GetStudentsByTutorUseCases(databaseStudent);
export const listStudentsUseCases = new ListStudentsUseCases(databaseStudent);
export const updateStudentUseCases = new UpdateStudentUseCases(databaseStudent);

//Student controllers
export const addSubjectToStudentController = new AddSubjectToStudentController(addSubjectToStudentUseCases);
export const addTutorToStudentController = new AddTutorToStudentController(addTutorToStudentUseCases);
export const createStudentController = new CreateStudentController(createStudentUseCases);
export const deleteStudentController = new DeleteStudentController(deleteStudentUseCases);
export const getStudentByUUIDController = new GetStudentByUUIDController(getStudentByUUIDUseCases);
export const getStudentsByTutorController = new GetStudentsByTutorController(getStudentsByTutorUseCases);
export const listStudentsController = new ListStudentsController(listStudentsUseCases);
export const updateStudentController = new UpdateStudentController(updateStudentUseCases);

//Subject database
export const databaseSubject = new MongoSubjectRepository();

//Subject use cases
export const createSubjectUseCases = new CreateSubjectUseCases(databaseSubject);
export const deleteSubjectUseCases = new DeleteSubjectUseCases(databaseSubject);
export const getSubjectByUUIDUseCases = new GetSubjectByUUIDUseCases(databaseSubject);
export const getSubjectsByStudentUUIDUseCases = new GetSubjectsByStudentUUIDUseCases(databaseSubject);
export const listSubjectsUseCases = new ListSubjectsUseCases(databaseSubject);
export const updateSubjectUseCases = new UpdateSubjectUseCases(databaseSubject);

//Subject controllers
export const createSubjectController = new CreateSubjectController(createSubjectUseCases);
export const deleteSubjectController = new DeleteSubjectController(deleteSubjectUseCases);
export const getSubjectByUUIDController = new GetSubjectByUUIDController(getSubjectByUUIDUseCases);
export const getSubjectsByStudentUUIDController = new GetSubjectsByStudentUUIDController(getSubjectsByStudentUUIDUseCases);
export const listSubjectsController = new ListSubjectsController(listSubjectsUseCases);
export const updateSubjectController = new UpdateSubjectController(updateSubjectUseCases);

//Tutor database
export const databaseTutor = new MongoTutorRepository();

//Tutor use cases
export const createTutorUseCases = new CreateTutorUseCases(databaseTutor);
export const deleteTutorUseCases = new DeleteTutorUseCases(databaseTutor);
export const getTutorByUUIDUseCases = new GetTutorByUUIDUseCases(databaseTutor);
export const listTutorsUseCases = new ListTutorsUseCases(databaseTutor);
export const updateTutorUseCases = new UpdateTutorUseCases(databaseTutor);

//Tutor controllers
export const createTutorController = new CreateTutorController(createTutorUseCases);
export const deleteTutorController = new DeleteTutorController(deleteTutorUseCases);
export const getTutorByUUIDController = new GetTutorByUUIDController(getTutorByUUIDUseCases);
export const listTutorsController = new ListTutorsController(listTutorsUseCases);
export const updateTutorController = new UpdateTutorController(updateTutorUseCases); 