import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { UpdateSubjectUseCases } from '../../application/use_cases/UpdateSubjectUseCases';
import { UpdateSubjectRequest } from '../../application/dtos/request/UpdateSubjectRequest';

export class UpdateSubjectController {
    constructor(readonly useCase: UpdateSubjectUseCases) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const uuid = req.params.uuid;
        const request = new UpdateSubjectRequest(data.name, data.description);
        try {
            const baseResponse = await this.useCase.execute(uuid, request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}