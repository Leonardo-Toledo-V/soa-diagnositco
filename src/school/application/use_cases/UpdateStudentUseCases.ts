import { Student } from './../../domain/entities/Student';
import { StudentInterface } from "../../domain/ports/StudentInterface";
import { UpdateStudentRequest } from "../dtos/request/UpdateStudentRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StudentResponse } from '../dtos/response/StudentResponse';

export class UpdateStudentUseCases {
    constructor(readonly repository: StudentInterface) { }

    async execute(uuid: string, request: UpdateStudentRequest): Promise<BaseResponse> {
        let student = new Student(request.name, request.email, request.lastname);
        student.uuid = uuid;
        let result = await this.repository.update(uuid, student);
        if (result) {
            let response = new StudentResponse(result.uuid, result.name, result.email, result.tutor, result.subjects, result.lastname);
            return new BaseResponse(response, "Student updated successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error updating student", false, 500);
        }
    }
}