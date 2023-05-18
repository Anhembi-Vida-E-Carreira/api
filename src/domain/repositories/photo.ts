import { IPhoto } from "../entities/photo"

export interface IPhotoRepository {
    create: (base64: string, reportId: string) => Promise<void>
    getByReport: (reportId: string) => Promise<IPhoto>
}
