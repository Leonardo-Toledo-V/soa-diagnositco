import { SubjectInterface } from "../../domain/ports/SubjectInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteSubjectUseCases {

    constructor(readonly repository: SubjectInterface) {
    }

    async execute(uuid: string): Promise<BaseResponse> {
        await this.repository.delete(uuid);
        return new BaseResponse(null, "Subject deleted successfully", true, 200);
    }
}