import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { UpdateStudentRequest } from '../../application/dtos/request/UpdateStudentRequest';
import { UpdateStudentUseCases } from '../../application/use_cases/UpdateStudentUseCases';

export class UpdateStudentController {
    constructor(readonly useCase: UpdateStudentUseCases) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const uuid = req.params.uuid;
        const request = new UpdateStudentRequest(data.name, data.email, data.tutor, data.lastname);
        try {
            const baseResponse = await this.useCase.execute(uuid, request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}