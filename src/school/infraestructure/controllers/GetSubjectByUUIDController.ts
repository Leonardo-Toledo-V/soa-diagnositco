import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { GetSubjectByUUIDUseCases } from '../../application/use_cases/GetSubjectByUUIDUseCases';

export class GetSubjectByUUIDController {
    constructor(readonly useCase: GetSubjectByUUIDUseCases) { }

    async execute(req: Request, res: Response) {
        const uuid = req.params.uuid;
        try {
            const BaseResponse = await this.useCase.execute(uuid);
            res.status(BaseResponse.statusCode).json(BaseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}