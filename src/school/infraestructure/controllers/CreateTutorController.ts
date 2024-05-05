import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { CreateTutorUseCases } from '../../application/use_cases/CreateTutorUseCases';
import { CreateTutorRequest } from '../../application/dtos/request/CreateTutorRequest';

export class CreateTutorController {
    constructor(readonly useCase: CreateTutorUseCases) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const request = new CreateTutorRequest(data.name, data.lastname, data.email);
        try {
            const baseResponse = await this.useCase.execute(request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}