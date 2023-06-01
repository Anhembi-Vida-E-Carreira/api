import { Request, Response } from "express";
import FilterRepository from "../../infra/repositories/filter";

const filterRepository = new FilterRepository()

export default class FilterController {
    constructor (){}    

    async get (req: Request, res: Response): Promise<void>{
        try {
            const filters = await filterRepository.getAll()
            res.status(200).send(filters)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}