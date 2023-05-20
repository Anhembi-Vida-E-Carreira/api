import { IReport } from "../../domain/entities/report";
import { IReportRepository } from "../../domain/repositories/report";
import { connection as Database } from "../db/connection";

export class ReportRepository implements IReportRepository{
    
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

    async create (report: IReport): Promise<void>{

    }
}