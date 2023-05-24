import { Request, Response } from "express";
import { IFilterRepository } from "../../domain/repositories/filter";

export default class FilterController {
    constructor (
        private readonly filterRepository: IFilterRepository
    ){}
        
    

    async get (req: Request, res: Response): Promise<void>{
        try {
            const filters = await this.filterRepository.getAll()
            res.status(200).send(filters)
        } catch (err) {
            res.status(500).send(err)
        }
    }
}