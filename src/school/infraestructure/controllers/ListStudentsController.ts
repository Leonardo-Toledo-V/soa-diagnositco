import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { ListStudentsUseCases } from '../../application/use_cases/ListStudentsUseCases';

export class ListStudentsController {
    constructor(readonly useCase: ListStudentsUseCases) { }

    async execute(req: Request, res: Response) {
        try {
            const baseResponse = await this.useCase.execute();
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}