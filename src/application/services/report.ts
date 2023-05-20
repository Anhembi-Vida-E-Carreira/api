import { IPhoto } from "../../domain/entities/photo";
import { ApplicationError } from "../../domain/error/application";
import { IFilterRepository } from "../../domain/repositories/filter";
import { IPhotoRepository } from "../../domain/repositories/photo";
import { IReportRepository } from "../../domain/repositories/report";
import { IReportService, ReportServiceDTO } from "../../domain/services/report";

export class ReportService implements IReportService{
    constructor (
        private readonly reportRepository: IReportRepository,
        private readonly filterRepository: IFilterRepository,
        private readonly photoRepository: IPhotoRepository
    ){}

    async create (input: ReportServiceDTO.createReportInput): Promise<void>{
        const exists = await this.reportRepository.getByDescription(input.description)
        if (exists) throw new ApplicationError("This report already exists", 400)

        const cityIsRegistered = await this.filterRepository.findByName(input.city)
        const districtIsRegistered = await this.filterRepository.findByName(input.district)
        const stationIsRegistered = await this.filterRepository.findByName(input.station)
        
        if (!cityIsRegistered) await this.filterRepository.create(input.city, 'city')
        if (!districtIsRegistered) await this.filterRepository.create(input.district, 'district')
        if (!stationIsRegistered) await this.filterRepository.create(input.station, 'station')

        const report = await this.reportRepository.create({...input, rating: 0})

        for (const image of input.images){
            await this.photoRepository.create(image, report.id)
        }
    }

    async update (input: ReportServiceDTO.updateReportRatingInput): Promise<void>{
        const exists = await this.reportRepository.getByDescription(input.description)
        if (!exists) throw new ApplicationError("This report doesn't exists", 400)
        await this.reportRepository.updateRating(exists.id, exists.rating + 1)
    }

    async get (): Promise<ReportServiceDTO.getReportsOutput>{
        const reports = await this.reportRepository.getAll()
        const result = []
        for (const report of reports){
            const images = await this.photoRepository.getByReport(report.id)
            result.push({...report, images})
        }
        return result
    }

    async getByFilter (input: ReportServiceDTO.getReportsByFilterInput): Promise<ReportServiceDTO.getReportsByFilterOutput>{
        const reports = []
        for (const filter of input.filters) {
            const filteredReports = await this.reportRepository.getByFilter(filter)
            for (const filteredReport of filteredReports){
                const images = await this.photoRepository.getByReport(filteredReport.id)
                reports.push({...filteredReport, images})
            }
        }
        return reports
    }
}