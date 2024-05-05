import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { DeleteTutorUseCases } from '../../application/use_cases/DeleteTutorUseCases';

export class DeleteTutorController {
    constructor(readonly deleteUserCase: DeleteTutorUseCases) { }

    async execute(req: Request, res: Response) {
        const { uuid } = req.params;
        try {
            const baseReponse = await this.deleteUserCase.execute(uuid);
            res.status(200).send(baseReponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}