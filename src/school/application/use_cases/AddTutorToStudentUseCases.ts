import { StudentInterface } from "../../domain/ports/StudentInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StudentResponse } from "../dtos/response/StudentResponse";

export class AddTutorToStudentUseCases {
    constructor(readonly repository: StudentInterface) { }

    async execute(uuidStudent: string, uuidTutor: string): Promise<BaseResponse> {
        let result = await this.repository.addTutorToStudent(uuidStudent, uuidTutor);
        console.log(result);
        if (result) {
            let response = new StudentResponse(result.uuid, result.name, result.email, result.tutor, result.subjects, result.lastname);
            return new BaseResponse(response, "Tutor added successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error adding tutor to student", false, 500);
        }
    }
}