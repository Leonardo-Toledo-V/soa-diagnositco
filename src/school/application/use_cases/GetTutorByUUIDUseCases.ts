import { TutorInterface } from "../../domain/ports/TutorInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TutorResponse } from "../dtos/response/TutorResponse";

export class GetTutorByUUIDUseCases {
    constructor(readonly repository: TutorInterface) { }

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.repository.findByUUID(uuid);
        if (result) {
            let response = new TutorResponse(result.uuid, result.name, result.lastname, result.email, result.students);
            return new BaseResponse(response, "Tutor found successfully", true, 200);
        } else {
            return new BaseResponse(null, "Tutor not found", false, 404);
        }
    }
}