import { FilterTypes, IFilter } from "../entities/filter"

export interface IFilterRepository {
    getAll: () => Promise<IFilter[]>
}