import { FilterTypes, IFilter } from "../entities/filter"

export interface IFilterRepository {
    create: (name: string, type: FilterTypes) => Promise<void>
    getAll: () => Promise<IFilter[]>
    findByName: (name: string) => Promise<IFilter>
}