import { IReport } from "../entities/report";

export interface IReportRepository {
    create: (report: IReport) => Promise<void>
    getAll: () => Promise<IReport[]>
    getByFilter: (filter: string) => Promise<IReport[]>
    updateRating: (reportId: string, newRating: number) => Promise<void>
    getByDescription: (description: string) => Promise<IReport>
}