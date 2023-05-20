export type TimeFilter = 'lastWeek' | 'today' | 'lastMonth'
export type FilterTypes = 'city' | 'district' | 'station' | TimeFilter

export interface IFilter {
    id: string,
    type: FilterTypes,
    name: string
}