import { IReport } from "../../domain/entities/report";
import { IReportRepository } from "../../domain/repositories/report";
import { TimeFilter } from "../../domain/entities/filter";
import { Database as database } from "../db/connection";


export class ReportRepository implements IReportRepository{
    constructor (){}
    
    private toModel (data: any): IReport {
        return {
            id: data.idDenuncia,
            title: data.tituloDenuncia,
            description: data.descricao,
            district: data.bairro,
            city: data.cidade,
            postDate: data.dataHoraPostagem,
            rating: data.votos,
            station: data.estacao
        }
    }

    private async removeExpired (): Promise<void> {
       await database.query(`delete from denuncias where DATE(dataExpirar) >= CURDATE()`)
    }

    async create (report: Omit<IReport, "id" | "postDate">): Promise<IReport>{
        await database.query(`
        insert into denuncias (tituloDenuncia, bairro, cidade, estacao, descricao, votos)
        values ('${report.title}', '${report.district}', '${report.city}', '${report.station}', '${report.description}', ${report.rating})
        `)

        const [data] = await database.query(`select * from denuncias where descricao = '${report.description}'`)
        console.log(data)
        return this.toModel(data)
    }

    async updateRating (reportId: number, newRating: number): Promise<void>{
        await database.query(`update denuncias set rating = ${newRating} where idDenuncia = ${reportId}`)
    }

    async getAll (): Promise<IReport[]>{
        await this.removeExpired()
        const data = await database.query('select * from denuncias')
        if (data.length){
        const reports : IReport[] = []
        data.forEach((report: any) => {
            const modeled = this.toModel(report)
            if (modeled.id) {
                reports.push(modeled)
            }
        })
        return reports
        }
        return []
    }

    async getByDescription (description: string): Promise<IReport | undefined>{
        const [result] = await database.query(`select * from denuncias where descricao = '${description}'`)
        if (result) return this.toModel(result)
    }

    async getByStation (station: string): Promise<IReport[]>{
        const data = await database.query(`select * from denuncias where estacao = '${station}'`)
        const reports: IReport[] = []
        data.forEach((report: any) => {
            reports.push(this.toModel(report))
        })
        return reports
    }

    async getByTimeFilter (filter: TimeFilter): Promise<IReport[]>{
        let data
        let reports : IReport[] = []
        switch (filter){
            case 'today': 
                data = await database.query(`select * from denuncias where DATE(dataHoraPostagem) = CURDATE()`)
                data.forEach((report: any) => {
                    reports.push(this.toModel(report))
                })
                return reports
            case "lastWeek":
                data = await database.query(`
                select * from denuncias where DATE(dataHoraPostagem) >= CURDATE() - INTERVAL 1 WEEK
                and DATE(dataHoraPostagem) <= CURDATE()`)
                data.forEach((report: any) => {
                    reports.push(this.toModel(report))
                })
                return reports
            default: 
                data = await database.query(`
                select * from denuncias where DATE(dataHoraPostagem) >= CURDATE() - INTERVAL 2 WEEK
                and DATE(dataHoraPostagem) <= CURDATE()`)
                data.forEach((report: any) => {
                    reports.push(this.toModel(report))
                })
                return reports 
        }
    }
}