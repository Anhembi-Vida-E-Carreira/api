export type TimeFilter = 'lastWeek' | 'today' | 'last2Weeks'
export type FilterTypes = 'station' | TimeFilter

export interface IFilter {
    id: number,
    type: FilterTypes,
    name: string
}