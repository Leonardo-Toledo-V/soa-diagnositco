import { Request, Response } from 'express';
import { GetStudentByUUIDUseCases } from "../../application/use_cases/GetStudentByUUIDUseCases";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';

export class GetStudentByUUIDController {
    constructor(readonly useCase: GetStudentByUUIDUseCases) { }

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