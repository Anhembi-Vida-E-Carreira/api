import { IPhotoRepository } from "../../domain/repositories/photo";
import { Connection } from "mysql2/promise";
import { IPhoto } from "../../domain/entities/photo";

export class PhotoRepository implements IPhotoRepository{
    constructor (
        private readonly database: Connection
    ){}

    private toModel (data: any): IPhoto {
        return {
            id: data.idAnexo,
            reportId: data.idDenuncia,
            url: data.anexo   
        }
    }

    async create (base64: string, reportId: number): Promise<void>{
        const [data] = await this.database.execute(`
        insert into anexo (idDenuncia, anexo)
        values (${reportId}, '${base64}')
        `)
    }

    async getByReport (reportId: number): Promise<string[]>{
        const data = await this.database.execute(`select * from anexo where idDenuncia = ${reportId}`)
        const fotos : IPhoto[] = []
        data.forEach(foto => {fotos.push(this.toModel(foto))})
        return fotos.map(foto => foto.url);
    }
}