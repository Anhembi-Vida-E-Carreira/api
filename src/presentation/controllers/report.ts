import { Request, Response } from "express";
import { IReportService } from "../../domain/services/report";
import { ReportService } from "../../application/services/report";
import FilterRepository from "../../infra/repositories/filter";
import { PhotoRepository } from "../../infra/repositories/photo";
import { ReportRepository } from "../../infra/repositories/report";
import { Connection } from "mysql2/promise";

const reportRepository = new ReportRepository()
const photoRepository = new PhotoRepository()
const reportService = new ReportService(reportRepository, photoRepository)

export default class ReportController {
    constructor (){}

    async create (req: Request, res: Response): Promise<void> {
        const {content} = req.body
        console.log(content)
        try {
            await reportService.create(content)
            res.status(201)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }

    async update (req: Request, res: Response): Promise<void> {
        const {content} = req.body
        try {
            await reportService.update(content)
            res.status(200)
        } catch (err) {
            res.status(400).send(err)
        }
    }

    async get (req: Request, res: Response): Promise<void> {
        try {
            const reports = await reportService.get()
            console.log(reports)
            res.status(200).send(reports)
        } catch (err) {
            console.log(reportService.get())
            console.log(err)
            res.status(400).send(err)
        }
    }

    async getByFilter (req: Request, res: Response): Promise<void> {
        const {filters} = req.body
        try {
            const reports = await reportService.getByFilter(filters)
            res.status(200).send(reports)
        } catch (err) {
            res.status(400).send(err)
        }
    }
}