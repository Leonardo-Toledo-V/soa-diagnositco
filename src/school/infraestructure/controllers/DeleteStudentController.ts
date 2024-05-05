import { Request, Response } from 'express';
import { DeleteStudentUseCases } from "../../application/use_cases/DeleteStudentUseCases";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';

export class DeleteStudentController {
    constructor(readonly deleteUserCase: DeleteStudentUseCases) { }

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