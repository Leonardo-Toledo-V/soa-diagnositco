import { TutorInterface } from "../../domain/ports/TutorInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TutorResponse } from "../dtos/response/TutorResponse";

export class ListTutorsUseCases {
    constructor(readonly repository: TutorInterface) { }

    async execute(): Promise<BaseResponse> {
        let result = await this.repository.list();
        if (result) {
            let response = result.map(tutor => new TutorResponse(tutor.uuid, tutor.name, tutor.lastname, tutor.email, tutor.students));
            return new BaseResponse(response, "Tutors listed successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error listing tutors", false, 500);
        }
    }
}