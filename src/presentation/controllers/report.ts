import { Request, Response } from "express";
import { IReportService } from "../../domain/services/report"

export default class ReportController {
    constructor (
        private readonly reportService: IReportService
    ){}

    create (req: Request, res: Response): void {
        const {report} = req.body
        try {
            this.reportService.create(report)
            res.status(201)
        } catch (err) {
            res.status(400).send(err)
        }
    }

    update (req: Request, res: Response): void {
        const report = req.body
        try {
            this.reportService.update(report)
            res.status(200)
        } catch (err) {
            res.status(400).send(err)
        }
    }

    get (req: Request, res: Response): void {
        try {
            const reports = this.reportService.get()
            res.status(200).send(reports)
        } catch (err) {
            res.status(400).send(err)
        }
    }

    getByFilter (req: Request, res: Response): void {
        const {filters} = req.body
        try {
            const reports = this.reportService.getByFilter(filters)
            res.status(200).send(reports)
        } catch (err) {
            res.status(400).send(err)
        }
    }
}