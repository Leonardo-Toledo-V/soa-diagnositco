import { Request, Response } from 'express';
import { AddSubjectToStudentUseCases } from '../../application/use_cases/AddSubjectToStudentUseCases';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';

export class AddSubjectToStudentController{
    constructor(readonly useCase: AddSubjectToStudentUseCases){}

    async execute(req: Request, res: Response){
        const uuidStudent = req.params.uuidStudent;
        const uuidSubject = req.params.uuidSubject;
        try{
            const baseResponse = await this.useCase.execute(uuidStudent, uuidSubject);
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}