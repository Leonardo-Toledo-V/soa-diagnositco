import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { CreateSubjectUseCases } from '../../application/use_cases/CreateSubjectUseCases';
import { CreateSubjectRequest } from '../../application/dtos/request/CreateSubjectRequest';

export class CreateSubjectController {
    constructor(readonly useCase: CreateSubjectUseCases) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const request = new CreateSubjectRequest(data.name, data.description);
        try {
            const baseResponse = await this.useCase.execute(request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}