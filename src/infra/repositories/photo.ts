import { IPhotoRepository } from "../../domain/repositories/photo";
import { IPhoto } from "../../domain/entities/photo";
import { Database as database } from "../db/connection";

export class PhotoRepository implements IPhotoRepository{
    constructor (){}

    private toModel (data: any): IPhoto {
        return {
            id: data.idAnexo,
            reportId: data.idDenuncia,
            url: data.anexo   
        }
    }

    async create (base64: string, reportId: number): Promise<void>{
        await database.query(`
        insert into anexos (idDenuncia, anexo)
        values (${reportId}, '${base64}')
        `)
    }

    async getByReport (reportId: number): Promise<string[]>{
        const data = await database.query(`select * from anexos where idDenuncia = ${reportId}`)
        const photos : IPhoto[] = []
        data.forEach((photo: any) => {photos.push(this.toModel(photo))})
        return photos.map(foto => foto.url);
    }
}