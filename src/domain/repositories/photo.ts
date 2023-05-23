import { IPhoto } from "../entities/photo"

export interface IPhotoRepository {
    create: (base64: string, reportId: number) => Promise<void>
    getByReport: (reportId: number) => Promise<string[]>
}
