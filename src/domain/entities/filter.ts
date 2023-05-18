export type FilterTypes = 'city' | 'district' | 'station'

export interface IFilter {
    id: string,
    type: FilterTypes,
    name: string
}