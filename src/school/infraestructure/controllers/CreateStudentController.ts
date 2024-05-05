import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { CreateStudentUseCases } from '../../application/use_cases/CreateStudentUseCases';
import { CreateStudentRequest } from '../../application/dtos/request/CreateStudentRequest';

export class CreateStudentController {
    constructor(readonly useCase: CreateStudentUseCases) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const request = new CreateStudentRequest(data.name, data.email, data.lastname);
        try {
            const baseResponse = await this.useCase.execute(request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}