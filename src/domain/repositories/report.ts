import { TimeFilter } from "../entities/filter";
import { IReport } from "../entities/report";

export interface IReportRepository {
    create: (report: Omit<IReport, 'id' | 'postDate'>) => Promise<IReport>
    getAll: () => Promise<IReport[]>
    getByStation: (station: string) => Promise<IReport[]>
    getByTimeFilter: (filter: TimeFilter) => Promise<IReport[]>
    updateRating: (reportId: number, newRating: number) => Promise<void>
    getByDescription: (description: string) => Promise<IReport | undefined>
}