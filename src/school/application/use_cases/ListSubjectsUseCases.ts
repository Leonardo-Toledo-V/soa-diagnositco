import { SubjectInterface } from "../../domain/ports/SubjectInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { SubjectResponse } from "../dtos/response/SubjectResponse";

export class ListSubjectsUseCases {
    constructor(readonly repository: SubjectInterface) { }

    async execute(): Promise<BaseResponse> {
        let result = await this.repository.list();
        if (result) {
            let response = result.map(student => new SubjectResponse(student.uuid, student.name, student.description, student.students));
            return new BaseResponse(response, "Subjects listed successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error listing subjects", false, 500);
        }
    }
}