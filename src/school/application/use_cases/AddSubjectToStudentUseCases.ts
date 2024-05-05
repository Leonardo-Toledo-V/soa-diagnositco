import { StudentInterface } from "../../domain/ports/StudentInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StudentResponse } from "../dtos/response/StudentResponse";

export class AddSubjectToStudentUseCases {
    constructor(readonly repository: StudentInterface) { }

    async execute(uuidStudent: string, uuidSubject: string): Promise<BaseResponse> {
        let result = await this.repository.addSubjectToStudent(uuidStudent, uuidSubject);
        if (result) {
            let response = new StudentResponse(result.uuid, result.name, result.email, result.tutor, result.subjects, result.lastname);
            return new BaseResponse(response, "Subject added successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error adding subject to student", false, 500);
        }
    }
}