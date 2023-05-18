import { FilterTypes, IFilter } from "../entities/filter"

export interface IFilterRepository {
    create: (name: string, type: string) => Promise<void>
    getAll: () => Promise<IFilter[]>
}