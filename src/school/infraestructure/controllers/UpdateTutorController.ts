import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { UpdateTutorUseCases } from '../../application/use_cases/UpdateTutorUseCases';
import { UpdateTutorRequest } from '../../application/dtos/request/UpdateTutorRequest';

export class UpdateTutorController {
    constructor(readonly useCase: UpdateTutorUseCases) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const uuid = req.params.uuid;
        const request = new UpdateTutorRequest(data.name, data.email, data.lastname);
        try {
            const baseResponse = await this.useCase.execute(uuid, request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}