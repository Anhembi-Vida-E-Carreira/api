export interface IReportService {
    create: (input: ReportServiceDTO.createReportInput) => Promise<void>
    update: (input: ReportServiceDTO.updateReportRatingInput) => Promise<void>
    get: () => Promise<ReportServiceDTO.getReportsOutput>
    getByFilter: (input: ReportServiceDTO.getReportsByFilterInput) => Promise<ReportServiceDTO.getReportsByFilterOutput>
}

export namespace ReportServiceDTO {

    export type createReportInput = {
        description: string,
        station: string,
        city: string,
        district: string,
        images: string[]
    }

    export type updateReportRatingInput = {
        description: string
    }

    export type getReportsOutput = {
        id: string,
        description: string,
        station: string,
        city: string,
        district: string,
        rating: number,
        postDate: string,
        images: string[]
    }[]

    export type getReportsByFilterInput = {
        filters: string[]
    }

    export type getReportsByFilterOutput = {
        description: string,
        station: string,
        city: string,
        district: string,
        rating: number,
        postDate: string,
        images: string[]
    }[]
}