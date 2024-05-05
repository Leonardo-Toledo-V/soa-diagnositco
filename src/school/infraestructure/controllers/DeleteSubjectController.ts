import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { DeleteSubjectUseCases } from '../../application/use_cases/DeleteSubjectUseCases';

export class DeleteSubjectController {
    constructor(readonly deleteUserCase: DeleteSubjectUseCases) { }

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