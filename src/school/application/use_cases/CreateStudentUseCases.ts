import { Student } from "../../domain/entities/Student";
import { StudentInterface } from "../../domain/ports/StudentInterface";
import { CreateStudentRequest } from "../dtos/request/CreateStudentRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StudentResponse } from "../dtos/response/StudentResponse";

export class CreateStudentUseCases {
    constructor(readonly repository: StudentInterface) { }

    async execute(request: CreateStudentRequest): Promise<BaseResponse> {
        let student = new Student(request.name, request.email, request.lastname);
        let result = await this.repository.create(student);
        if (result) {
            let response = new StudentResponse(result.uuid, result.name, result.email, result.tutor, result.subjects, result.lastname);
            return new BaseResponse(response, "Student created successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error creating student", false, 500);
        }
    }
}