import { SubjectInterface } from "../../domain/ports/SubjectInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { SubjectResponse } from "../dtos/response/SubjectResponse";

export class GetSubjectByUUIDUseCases {
    constructor(readonly repository: SubjectInterface) { }

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.repository.findByUUID(uuid);
        if (result) {
            let response = new SubjectResponse(result.uuid, result.name, result.description, result.students);
            return new BaseResponse(response, "Subject found successfully", true, 200);
        } else {
            return new BaseResponse(null, "Subject not found", false, 404);
        }
    }
}