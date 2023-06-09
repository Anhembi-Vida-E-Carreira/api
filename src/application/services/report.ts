import { TimeFilter } from "../../domain/entities/filter";
import { IReport } from "../../domain/entities/report";
import { ApplicationError } from "../../domain/error/application";
import { IReportService, ReportServiceDTO } from "../../domain/services/report";
import { PhotoRepository } from "../../infra/repositories/photo";
import { ReportRepository } from "../../infra/repositories/report";

export class ReportService implements IReportService{
    constructor (
        private readonly reportRepository: ReportRepository,
        private readonly photoRepository: PhotoRepository
    ){}

    async create (input: ReportServiceDTO.createReportInput): Promise<void>{
        const exists = await this.reportRepository.getByDescription(input.description)
        if (exists) throw new ApplicationError("Essa denúncia já foi feita", 400)

        const report = await this.reportRepository.create({...input, rating: 0})

        for (const image of input.images){
            await this.photoRepository.create(image, report.id)
        }
    }

    async update (input: ReportServiceDTO.updateReportRatingInput): Promise<void>{
        const exists = await this.reportRepository.getByDescription(input.description)
        if (!exists) throw new ApplicationError("Essa denúncia não existe", 400)
        await this.reportRepository.updateRating(exists.id, exists.rating + 1)
    }

    async get (): Promise<ReportServiceDTO.getReportsOutput>{
        const reports = await this.reportRepository.getAll()
        const result = []
        if (reports.length){
        for (const report of reports){
            const images = await this.photoRepository.getByReport(report.id)
            result.push({...report, images})
        }}
        return result
    }

    async getByFilter (input: ReportServiceDTO.getReportsByFilterInput): Promise<ReportServiceDTO.getReportsByFilterOutput>{
        const reports = []
        for (const filter of input.filters) {
            let filteredReports : IReport[] = []
            if (filter === 'station'){ 
                filteredReports = await this.reportRepository.getByStation(filter)
            } else {
                filteredReports = await this.reportRepository.getByTimeFilter(filter as TimeFilter)
            }
            for (const filteredReport of filteredReports){
                const images = await this.photoRepository.getByReport(filteredReport.id)
                reports.push({...filteredReport, images})
            }
        }
        return reports
    }
}