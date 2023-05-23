import { Connection } from "mysql2/promise";
import { IReport } from "../../domain/entities/report";
import { IReportRepository } from "../../domain/repositories/report";
import { TimeFilter } from "../../domain/entities/filter";


export class ReportRepository implements IReportRepository{
    constructor (
        private readonly database: Connection
    ){}
    
    private toModel (data: any): IReport {
        return {
            id: data.idDenuncia,
            title: data.title,
            description: data.description,
            district: data.bairro,
            city: data.cidade,
            postDate: data.dataHoraPostagem,
            rating: data.votos,
            station: data.estacao
        }
    }

    private async removeExpired (): Promise<void> {
       await this.database.execute(`delete from denuncia where DATE(dataExpirar) >= CURDATE()`)
    }

    async create (report: Omit<IReport, "id" | "postDate">): Promise<IReport>{
        const [data] = await this.database.execute(`
        insert into denuncia (tituloDenuncia, bairro, cidade, estacao, descricao, votos)
        values (${report.title}, ${report.district}, ${report.city}, ${report.station}, ${report.description}, ${report.rating})
        `)
        return this.toModel(data)
    }

    async updateRating (reportId: number, newRating: number): Promise<void>{
        await this.database.execute(`update denuncia set rating = ${newRating} where idDenuncia = ${reportId}`)
    }

    async getAll (): Promise<IReport[]>{
        await this.removeExpired()
        const data = await this.database.execute('select * from denuncia')
        const reports : IReport[] = []
        data.forEach(report => {
            reports.push(this.toModel(report))
        })
        return reports
    }

    async getByDescription (description: string): Promise<IReport>{
        const [result] = await this.database.execute(`select * from denuncia where descricao = '${description}'`)
        return this.toModel(result)
    }

    async getByStation (station: string): Promise<IReport[]>{
        const data = await this.database.execute(`select * from denuncia where estacao = '${station}'`)
        const reports: IReport[] = []
        data.forEach(report => {
            reports.push(this.toModel(report))
        })
        return reports
    }

    async getByTimeFilter (filter: TimeFilter): Promise<IReport[]>{
        let data
        let reports : IReport[] = []
        switch (filter){
            case 'today': 
                data = await this.database.execute(`select * from denuncia where DATE(dataHoraPostagem) = CURDATE()`)
                data.forEach(report => {
                    reports.push(this.toModel(report))
                })
                return reports
            case "lastWeek":
                data = await this.database.execute(`
                select * from denuncia where DATE(dataHoraPostagem) >= CURDATE() - INTERVAL 1 WEEK
                and DATE(dataHoraPostagem) <= CURDATE()`)
                data.forEach(report => {
                    reports.push(this.toModel(report))
                })
                return reports
            default: 
                data = await this.database.execute(`
                select * from denuncia where DATE(dataHoraPostagem) >= CURDATE() - INTERVAL 2 WEEK
                and DATE(dataHoraPostagem) <= CURDATE()`)
                data.forEach(report => {
                    reports.push(this.toModel(report))
                })
                return reports 
        }
    }
}