import { StudentInterface } from "../../domain/ports/StudentInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteStudentUseCases {
    constructor(readonly repository: StudentInterface) { }

    async execute(uuid: string): Promise<BaseResponse> {
        await this.repository.delete(uuid);
        return new BaseResponse(null, "Student deleted successfully", true, 200);
    }
}