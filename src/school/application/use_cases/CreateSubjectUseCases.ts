import { Subject } from './../../domain/entities/Subject';
import { SubjectInterface } from "../../domain/ports/SubjectInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { CreateSubjectRequest } from '../dtos/request/CreateSubjectRequest';
import { SubjectResponse } from '../dtos/response/SubjectResponse';

export class CreateSubjectUseCases {
    constructor(readonly repository: SubjectInterface) { }

    async execute(request: CreateSubjectRequest): Promise<BaseResponse> {
        let student = new Subject(request.name, request.description);
        let result = await this.repository.create(student);
        if (result) {
            let response = new SubjectResponse(result.uuid, result.name, result.description, result.students);
            return new BaseResponse(response, "Subject created successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error creating subject", false, 500);
        }
    }
}