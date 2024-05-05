import { Tutor } from "../../domain/entities/Tutors";
import { TutorInterface } from "../../domain/ports/TutorInterface";
import { UpdateTutorRequest } from "../dtos/request/UpdateTutorRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TutorResponse } from "../dtos/response/TutorResponse";

export class UpdateTutorUseCases {
    constructor(readonly repository: TutorInterface) { }

    async execute(uuid: string, request: UpdateTutorRequest): Promise<BaseResponse> {
        let tutor = new Tutor(request.name, request.lastname, request.email);
        tutor.uuid = uuid;
        let result = await this.repository.update(uuid, tutor);
        if (result) {
            let response = new TutorResponse(result.uuid, result.name, result.lastname, result.email, result.students);
            return new BaseResponse(response, "Tutor updated successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error updating tutor", false, 500);
        }
    }
}