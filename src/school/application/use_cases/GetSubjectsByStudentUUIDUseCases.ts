import { SubjectInterface } from "../../domain/ports/SubjectInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class GetSubjectsByStudentUUIDUseCases {
    constructor(readonly repository: SubjectInterface) { }

    async execute(uuidSubject: string): Promise<BaseResponse> {
        let result = await this.repository.findAllSubjectsByStudent(uuidSubject);
        if (result) {
            let response = result.map((subject) => {
                return {
                    uuid: subject.uuid,
                    name: subject.name,
                    description: subject.description,
                    students: subject.students
                }
            });
            return new BaseResponse(response, "Subjects listed successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error listing subjects", false, 500);
        }
    }
}