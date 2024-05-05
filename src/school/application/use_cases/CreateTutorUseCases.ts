import { Tutor } from "../../domain/entities/Tutors";
import { TutorInterface } from "../../domain/ports/TutorInterface";
import { CreateTutorRequest } from "../dtos/request/CreateTutorRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TutorResponse } from "../dtos/response/TutorResponse";

export class CreateTutorUseCases {
    constructor(readonly repository: TutorInterface) { }

    async execute(request: CreateTutorRequest): Promise<BaseResponse> {
        let tutor = new Tutor(request.name, request.lastname, request.email);
        let result = await this.repository.create(tutor);
        if (result) {
            let response = new TutorResponse(result.uuid, result.name, result.lastname, result.email, result.students);
            return new BaseResponse(response, "Tutor created successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error creating tutor", false, 500);
        }
    }
}