import { TutorInterface } from "../../domain/ports/TutorInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteTutorUseCases {
    constructor(readonly repository: TutorInterface) { }

    async execute(uuid: string): Promise<BaseResponse> {
        await this.repository.delete(uuid);
        return new BaseResponse(null, "Subject deleted successfully", true, 200);
    }
}