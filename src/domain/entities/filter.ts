export type TimeFilter = 'lastWeek' | 'today' | 'last2Weeks'
export type FilterTypes = 'station' | TimeFilter

export interface IFilter {
    id: string,
    type: FilterTypes,
    name: string
}